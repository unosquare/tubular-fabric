import * as React from 'react';
const { 
  Fabric,
  DetailsList, 
  Selection, 
  Link,
  Icon,
  Image,
  ImageFit,
  MarqueeSelection,
  Spinner,
} = window.Fabric;

  const SUBREDDIT = 'bostonterriers';
  const THUMBSIZE = 80;
  let columns = [
    {
      key: 'score',
      name: 'Score',
      fieldName: 'score',
      minWidth: 40,
      maxWidth: 40,
      isResizable: true
    },
    {
      key: 'thumb',
      fieldName: 'thumb',
      minWidth: THUMBSIZE,
      maxWidth: THUMBSIZE,
      onRender: (item) => (
        <Image 
          className='thumb'
          imageFit={ ImageFit.cover}
          src={item.thumb} 
          width={THUMBSIZE} 
          height={THUMBSIZE} 
        />)
    },
    {
      key: 'article',
      name: 'Post',
      minWidth: 100,
      maxWidth: 180,
      isResizable: true,
      onRender: (item) => (
        <div style={{ whiteSpace: 'normal' }}>
          <Link className='ms-font-xl' href={ item.url } target='_blank'>{ item.title }</Link>
          <div className='itemMetadata'>
            <span>By { item.author }</span>
            <span><Icon iconName='chat'/> { item.comments } comment{ item.comments === 1 ? '' : 's'}</span>
          </div>
        </div>
      )
    }
  ];
  
  const Content: React.FunctionComponent = () => {
    const _selection = new Selection({
        onSelectionChanged: () => this.forceUpdate()
    });
    
    const [state, setState] = React.useState({
      filter: undefined,
      rows: [],
      isLoading: false,
      subreddit: SUBREDDIT,
      nextPageToken: undefined
    });    
    
    const _getRowsFromData = (response) => {
      let { rows, nextPageToken } = state;
      
      let items = response.children.map(child => {
        let data = child.data;
        return {
          key: data.id,
          subreddit: data.subreddit,
          title: data.title,
          author: data.author,
          url: data.url,
          score: data.score,
          thumb: data.thumbnail,
          comments: data.num_comments
        };
      });
  
      if (rows && nextPageToken) {
        items = rows.slice(0, rows.length - 1).concat(items);
      }
      
      if (response.after) {
        items.push(null);
      }
      
      return items;
    };
  
    const _onLoadNextPage = () => {
      let { subreddit, nextPageToken } = state;
      let url = `https://www.reddit.com/r/` +
          `${subreddit}.json` +
          `${nextPageToken ? '?after=' + nextPageToken : ''}`;

      setState({ ...state, isLoading: true });

      fetch(url).then(
        response => response.json()).then(json => {
        let rows = _getRowsFromData(json.data);

        setState({ 
          ...state,
          rows,
          nextPageToken: json.data.after,
          isLoading: false
        });

        _selection.setItems(rows);
      });
    };

  
    const _onReloadClick = () => {
      setState({ ...state, rows: [], nextPageToken: null });
      
      _onLoadNextPage();
    };

    React.useEffect(() => {
        _onReloadClick();
    },[]);
    
  
    const _onDelayedLoadNextPage = () => {
      let { isLoading } = state;
      
      if (!isLoading) {
        setState({ ...state, isLoading: true });
        
        // This setTimeout is only here for illustrating a slow API. Reddit API is pretty fast.
        setTimeout(() => _onLoadNextPage(), 1000);
      }
    };

    const filteredRows = !state.filter ? state.rows : state.rows.filter(row => row && row.title.toLowerCase().indexOf(state.filter.toLowerCase()) >= 0);
      
      return (
        <Fabric className='foo'>
          { state.rows && (
          <MarqueeSelection selection={_selection}>
            <DetailsList 
              setKey='boston'
              items={ filteredRows } 
              columns={columns}          
              selection={_selection }
              onRenderMissingItem={_onDelayedLoadNextPage}
              onRenderRow={ (props, defaultRender) => <div onClick={ () => console.log('clicking: ' + props.item.title)}>{defaultRender(props)}</div> }
            />
            { state.isLoading && (
            <Spinner className='loadingSpinner' label='Loading...' />
            ) }
          </MarqueeSelection>
          ) }
          
        </Fabric>
      );
  
  };

export default Content;
  
    