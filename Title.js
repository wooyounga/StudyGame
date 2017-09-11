function TitleState()
{
    this.imgBackground = resourcePreLoader.GetImage("img/title_background.png");
    this.flagButtonStart    = false;
    this.imgButtonStartOff  = resourcePreLoader.GetImage("img/title_start_off.png");
    this.imgButtonStartOn   = resourcePreLoader.GetImage("img/title_start_on.png");
    this.flagButtonBattle   = false;
    this.imgButtonBattleOff = resourcePreLoader.GetImage("img/title_battle_off.png");
    this.imgButtonBattleOn  = resourcePreLoader.GetImage("img/title_battle_on.png");
    this.flagButtonRanking  = false;
    this.imgButtonRankingOff= resourcePreLoader.GetImage("img/title_ranking_off.png");
    this.imgButtonRankingOn = resourcePreLoader.GetImage("img/title_ranking_on.png");

    soundSystem.PlayBackgroundMusic("sound/background.mp3");

    return this;
}

TitleState.prototype.Render = function( )
{
    var theCanvas = document.getElementById("GameCanvas");
    var Context  = theCanvas.getContext("2d");
    
    // 배경 화면 그리기
    Context.drawImage( this.imgBackground, 0, 0 );
    
    // 버튼 그리기
    if( this.flagButtonStart )
        Context.drawImage( this.imgButtonStartOn, 0, 0 );
    else
        Context.drawImage( this.imgButtonStartOff, 0, 0 );
    if( this.flagButtonBattle )
        Context.drawImage( this.imgButtonBattleOn, 0, 0 );
    else
        Context.drawImage( this.imgButtonBattleOff, 0, 0 );
    if( this.flagButtonRanking )
        Context.drawImage( this.imgButtonRankingOn, 0, 0 );
    else
        Context.drawImage( this.imgButtonRankingOff, 0, 0 );
}

TitleState.prototype.UpdateUI = function( ) {
    // 먼저 플래그 값을 초기화
    if( inputSystem.mouseX > 370 && inputSystem.mouseY >337 
        && inputSystem.mouseX < 370 + 62 && inputSystem.mouseY <337 + 35 ) {
        if( this.flagButtonStart == false ) {
            this.flagButtonStart = true; 
        }
    }
    else {
        this.flagButtonStart    = false;
    }
    if( inputSystem.mouseX > 370 && inputSystem.mouseY >390 
        && inputSystem.mouseX < 370 + 62 && inputSystem.mouseY <390 + 35 ) {
        if( this.flagButtonRanking == false ) {
            this.flagButtonRanking = true; 
        }
    }
    else {
        this.flagButtonRanking    = false;
    }
    if( inputSystem.mouseX > 370 && inputSystem.mouseY >450 
        && inputSystem.mouseX < 370 + 62 && inputSystem.mouseY <450 + 35 ) {
        if( this.flagButtonBattle == false ) {
            this.flagButtonBattle = true; 
        }
    }
    else {
        this.flagButtonBattle    = false;
    }
}

TitleState.prototype.Update = function( ) {
    this.UpdateUI();
}

TitleState.prototype.Init = function(){
    // 이 함수가 필요한 이유
    // 웹브라우저에 따라 음악이 실행될 수도 안될 수도 있기 때문에
    // 이 객체를 곧 사용할 테니 초기화하자 라는 느낌의 초기화 루틴임.
    // 게임 상태가 실제로 바뀔 때 호출되는 용도로 객체에 함수를 추가하고 GameFramework.js로 이동하여
    // CnangeGameState 함수에서 게임 상태가 변경될 때 Init 함수를 호출하게 된다.
    soundSystem.PlayBackgroundMusic("sound/background.mp3");
}

TitleState.prototype.onMouseDown = function( ) {
    if( this.flagButtonStart )
        ChangeGameState( new PlayGameState() );// // 게임상태
    if( this.flagButtonBattle )
        ChangeGameState( new WaitMultiPlayGameState() ); //대전상태
    if( this.flagButtonRanking )
        ChangeGameState( /*랭킹 상태*/ );
}


