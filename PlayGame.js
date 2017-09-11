/**
 * Created by 완두콩 on 2017-02-16.
 */
function PlayGameState(){
   this.background = new PGBackground();
   this.playground = new PGPlayground();
   this.player = new PGPlayer();
   this.isGameOver = false; // 게임 오버상태인지 아닌지 체크
   this.score = 0;
   playGameState = this;
}

PlayGameState.prototype.Init = function(){

}

PlayGameState.prototype.Notification = function ( msg ){
    switch( msg ){
        case "COLLISION_ELEGATOR" :
            this.isGameOver = true;
            break;
        //메세지가 위와 같을 때 게임오버
        case "HP_TARINAI" :
            this.isGameOver = true;
            break;
        case "MONSTER_SCORE" :
            this.score += 200;
            break;
    }
}

PlayGameState.prototype.Render = function(){
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    this.background.RenderLayerBack(); // 뒷배경부분을 그려줌

    this.playground.Render(); // 플레이어가 밟는 box부분을 그려줌
    this.player.Render(); // 플레이어를 그려줌

    this.background.RenderLayerFront(); // 앞배경을 그려줌

    //점수
    Context.font = '45px Arial';
    Context.textBaseline = "top";
    Context.fillText( "SCORE : " + this.score,5,5);

    // 위에서부터 순서대로 겹겹히 쌓여서 배경이 만들어지는 방식임임

   if(this.isGameOver){
        Context.drawImage(resourcePreLoader.GetImage("img/game_gameover.png"),0,0);//게임오버상태가 되면 게임오버 배경을 띄워줌
    }
}

PlayGameState.prototype.Update = function(){
    if(this.isGameOver){
        if( inputSystem.isKeyDown( 13 )) { //엔터를 치면 게임 플레이 다시 시작
            this.score = 0;
            ChangeGameState(new PlayGameState());
        }

        this.player.GameOver();//게임 오버가 되면 플레이어 객체에 있는 gameover메소드 실행

        return;
    }
    this.background.Update(); //배경(풀숲과 구름)은 계속 움직여야하므로 업데이트
    this.playground.Update(); // 플레이어가 밟는 부분도 마찬가지
    this.player.Update();       // 플레이어가 움직여야하니 마찬가지
    this.playground.CheckCollision( this.player );
    // 부딪히는 부분(빠지는 부분)이 있는지 없는지에 대해서 지속적 확인이 필요함
    //this.player.collisionBox는 player객체 안에 있음
}