function ResourcePreLoader()
{
    this.isLoadComplete = false;
    this.nowResourceLoadedCount = 0; // 현재 로딩된 리소스 수
    this.intAllResourceCount = 0;
    this.arrResource = new Array();
    return this;
}

ResourcePreLoader.prototype.AddImage = function( fileName )
{    
    // 리소스 중복에 대한 처리
    for( var i = 0; i < this.arrResource.length; i++ )
    {
        if( this.arrResource[i].name == fileName )
        {
            debugSystem.Log( "WARN", "overlap resource "+ fileName );
            return;
        }
    }
    
    var img = new Image();
    img.src = fileName;
    img.addEventListener("load", onLoadImageResourceComplete, false);
    this.arrResource.push( { name: fileName ,image: img  } );
    this.intAllResourceCount++;
}

ResourcePreLoader.prototype.GetImage = function( fileName )
{
    for( var i = 0; i < this.arrResource.length; i++ )
    {
        if( this.arrResource[i].name == fileName )
        {
            return this.arrResource[i].image;  
        }
    }
    
    debugSystem.Log( "ERROR", "can't find resource "+ fileName );
    return null;
}


var resourcePreLoader = new ResourcePreLoader();

function onLoadImageResourceComplete()
{
    resourcePreLoader.nowResourceLoadedCount++;
    // 현재 로딩된 리소스 수와 총 리소스 수 와 비교
    if( resourcePreLoader.nowResourceLoadedCount <= resourcePreLoader.intAllResourceCount )
    {
        // 모든 리소스 로딩 완료!!
        resourcePreLoader.isLoadComplete  = true;
    }
}

function LoadingState()
{
    return this;
}

LoadingState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    var totalResourceCount = resourcePreLoader.intAllResourceCount + soundSystem.intAllResourceCount;
    var nowCompleteResourceCount = resourcePreLoader.nowResourceLoadedCount + soundSystem.nowResourceLoadedCount;

    Context.fillText( "Now Loading. ." + nowCompleteResourceCount + "/" + totalResourceCount, 350, 280 );
}

LoadingState.prototype.Update = function( )
{
    // 리소스를 모두 로딩했다면 게임 타이틀 상태로 전환한다.
    if( resourcePreLoader.isLoadComplete && soundSystem.isLoadComplete )
    {
        ChangeGameState( after_loading_state );
    }    
}

