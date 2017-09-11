function onGameInit() 
{   
    document.title = "게임명뭐하지";
    
    GAME_FPS = 30;
    debugSystem.debugMode = false;
    
    // 리소스 프리로딩 추가
    resourcePreLoader.AddImage( "img/player_die.png" );
    resourcePreLoader.AddImage( "img/title_background.png" );   
    resourcePreLoader.AddImage( "img/title_start_off.png" );   
    resourcePreLoader.AddImage( "img/title_start_on.png" );   
    resourcePreLoader.AddImage( "img/title_battle_off.png" );   
    resourcePreLoader.AddImage( "img/title_battle_on.png" );   
    resourcePreLoader.AddImage( "img/title_ranking_off.png" );   
    resourcePreLoader.AddImage( "img/title_ranking_on.png" );   
    resourcePreLoader.AddImage( "img/title_credit_off.png" );   
    resourcePreLoader.AddImage( "img/title_credit_on.png" );
    resourcePreLoader.AddImage( "img/background01.png" );
    resourcePreLoader.AddImage( "img/game_item.png" );
    resourcePreLoader.AddImage( "img/background_cloud.png" );
    resourcePreLoader.AddImage( "img/background02.png" );
    resourcePreLoader.AddImage( "img/game_background00.png" );   
    resourcePreLoader.AddImage( "img/game_background01.png" );   
    resourcePreLoader.AddImage( "img/game_background02.png" );
    resourcePreLoader.AddImage( "img/game_background03.png" );
    resourcePreLoader.AddImage( "img/game_crater.png" );
    resourcePreLoader.AddImage( "img/game_monster_off.png" );
    resourcePreLoader.AddImage( "img/game_monster_on.png" );
    resourcePreLoader.AddImage( "img/game_box01.png" );
    resourcePreLoader.AddImage( "img/game_box02.png" );
    resourcePreLoader.AddImage( "img/game_box03.png" );
    resourcePreLoader.AddImage( "img/game_player.png" );  
    resourcePreLoader.AddImage( "img/game_gameover.png" );   
    resourcePreLoader.AddImage( "img/game_item_coin.png" );  
    resourcePreLoader.AddImage( "img/game_item_chest.png" );
    soundSystem.AddSound( "sound/background.mp3", 1 );
    
    // 게임 초기 시작 상태 설정
    after_loading_state = new TitleState();
    setInterval( gameLoop, 1000 / GAME_FPS );  
}


window.addEventListener("load", onGameInit, false);
