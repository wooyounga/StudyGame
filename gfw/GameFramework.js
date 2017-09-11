window.addEventListener("mousedown", onMouseDown, false);
window.addEventListener("mouseup", onMouseUp, false);

var GAME_FPS;
var game_state = new LoadingState(); 
var after_loading_state;

function onMouseDown (e) 
{
  if( game_state.onMouseDown != undefined )
    game_state.onMouseDown(e);
}

function onMouseUp (e) 
{
  if( game_state.onMouseUp != undefined )
    game_state.onMouseUp(e);
}

function ChangeGameState( nextGameState )
{
  // 필수 함수가 있는지 확인한다.
  if( nextGameState.Init == undefined )
    return;   
  if( nextGameState.Update == undefined )
    return;
  if( nextGameState.Render == undefined )
    return;
  
  // 필수 함수가 있으면 상태 전환
  game_state = nextGameState;
  
  // 초기화
  game_state.Init();
}


function Update()
{
  // 타이머 업데이트
  timerSystem.Update();
    
  // 업데이트 
  game_state.Update();
  
  // 배포시에는 아래 코드를 주석처리하거나 삭제하면 개발버전 전환 기능 해제
  debugSystem.UseDebugMode();
}

function Render()
{
  // 그리기
  var theCanvas = document.getElementById("GameCanvas");
  var Context  = theCanvas.getContext("2d");

  Context.fillStyle = "#000000";
  Context.fillRect(0, 0, 800, 600); 
  
  game_state.Render();
  
  if( debugSystem.debugMode )
  {
    // FPS 표시
    Context.fillStyle    = "#ffffff";   
    Context.font         = '15px Arial'; 
    Context.textBaseline = "top";
    Context.fillText( "fps : " + frameCounter.Lastfps, 10, 10 );    
  }
}

function gameLoop()
{   
  Update();
  Render();
  
  frameCounter.countFrame();
}

