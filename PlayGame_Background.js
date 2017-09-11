/**
 * Created by 완두콩 on 2017-02-16.
 */
function PGBackground(){
    this.imgBackground00 = resourcePreLoader.GetImage("img/game_background00.png");
    this.imgBackground01 = resourcePreLoader.GetImage("img/background_cloud.png");
    this.imgBackground03 = resourcePreLoader.GetImage("img/background02.png");

    this.pos01 = 600; // 구름이 시작할 위치
    this.pos03 = 0; // 풀숲이 시작할 위치
                    // 참고로 배경은 가로세로 600x600임
    this.speed01 = 1; // 지나갈 스피드 설정
    this.speed03 = 5; //지나갈 스피드 설정
}

PGBackground.prototype.Update = function(){
    this.pos01 -= this.speed01; //현재 포지션을 현재 스피드만큼 계속 깎음
    if( this.pos01 < -900 ){ // 그 포지션이 계속 줄어들어서 이미지가 안보이게 되면
        this.pos01 = 600;   // 포지션을 처음으로 돌림
    }
    this.pos03 -= this.speed03;
    if( this.pos03 < -261 ){
        this.pos03 += 261;
    }
}

PGBackground.prototype.RenderLayerFront = function(){
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    for(var i = 0; i < 5; i++){
        Context.drawImage( this.imgBackground03, this.pos03 + 261 * i, 0 );
        // 이미지를 가로로 계속 이어붙임 / 261은 이미지의 가로크기 *i를 함으로써 다음 이미지가 어디에 위치 할지 앎
        // ex) 현재 i=0 그럼 x좌표가 0인 지점에 이미지가 생김 / 현재 i=1 그럼 x좌표가 261인 지점에 이미지가 생김
        // 그렇게 되면 이미지가 딱붙게 이어짐
    }
}

PGBackground.prototype.RenderLayerBack = function(){
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.drawImage( this. imgBackground00, 0 , 0 );
    for(var i = 0 ; i < 5 ; i++){
        Context.drawImage( this. imgBackground01, this.pos01 + 261 , 80 );
    }
}