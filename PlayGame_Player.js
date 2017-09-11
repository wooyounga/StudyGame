/**
 * Created by 완두콩 on 2017-02-18.
 */
function PGPlayer(){
    this.sprPlayer = new SpriteAnimation(
        resourcePreLoader.GetImage("img/game_player.png"),
        121,126,3,9); // 스프라이트 애니메이션
    this.x=50;
    this.y = 337;
    // 플레이어의 x와 y값

    this.isJumping = false;
    this.jumpPower = 0;

    this.damage = 2;   // 플레이어 데미지
    this.playerHP = 50;  // 플레이어 체력

    this.collisionBox
        = {left: this.x,top : this.y, right: this.x + 121, bottom: this.y + 126 };
        // 충돌박스 구간 설정

    this.Invalid();
}
PGPlayer.prototype.Init = function( )
{
    this.Invalid();
}

PGPlayer.prototype.GameOver = function(){
    if(this.playerHP >0) { // 낙사로 사망시
        this.y += 10;
        this.x += 3;
        this.sprPlayer.SetPosition(this.x, this.y);
    } else { // 맞아죽을시
        this.sprPlayer.x = 50;
        this.sprPlayer.y = 343;
    }
    // 게임오버를 하게 되면 아래로 계속 떨어지면서 앞으로 조금씩 움직임
}

PGPlayer.prototype.Invalid = function(){
    this.sprPlayer.SetPosition(this.x , this.y); // 위치 고정
    this.collisionBox
         = {left: this.x,top : this.y, right: this.x + 121, bottom: this.y + 126 };
}

PGPlayer.prototype.Render = function(){
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.fillStyle    = "#ffffff";
    Context.font         = '20px Arial';
    Context.textBaseline = "top";
    Context.fillText( 'HP : '+ this.playerHP, this.sprPlayer.x+50, this.sprPlayer.y-30 );

    this.sprPlayer.Render( Context );
}

PGPlayer.prototype.Update = function(){
    this.sprPlayer.Update();
    if( this.isJumping == false)
    {
        if(inputSystem.isKeyDown(32)){
            this.isJumping = true;
            this.jumpPower = -25;
        }
    }
    else {
        this.y += this.jumpPower;
        this.jumpPower += 1.5;
        if(this.y >= 337){
            this.y = 337;
            this.isJumping=false;
        }
        this.Invalid();
    }
}

PGPlayer.prototype.HPdamage = function(damage){
    this.playerHP -= damage;
    if(this.playerHP <= 0){
        this.sprPlayer.img = resourcePreLoader.GetImage("img/player_die.png"); // 죽을시 사망모션
        this.sprPlayer.totalFrameCount = 0;
        this.sprPlayer.currentFrame = 0;
        playGameState.Notification("HP_TARINAI");
    }
}