/**
 * Created by 완두콩 on 2017-02-24.
 */

function Monster(){
    this.monsterOff = new GraphicObject(resourcePreLoader.GetImage("img/game_monster_off.png"));
    this.monsterOn = resourcePreLoader.GetImage("img/game_monster_on.png");
    this.x = 0;
    this.y = 0;
    this.healthPoint = 10; //체력
    this.MonterDamage = 2; //몬스터 공격력
    this.sibou = false; //사망처리 

    this.type ='monster'; // 현재 오브젝트 타입을 알려줌

    this.Invalid();
}

Monster.prototype.Translate = function( x, y ){
    this.monsterOff.Translate( x, y ); //x 방향과 y거리만큼 이동
    this.Invalid();
}

Monster.prototype.SetPosition = function( x, y ){
    this.monsterOff.SetPosition( x, y ); // x, y 좌표에 맞춰서 이동
    this.Invalid();
}

Monster.prototype.Render = function(){
    if (this.sibou)
        return;

    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    Context.fillStyle    = "#ffffff";
    Context.font         = '40px Arial';
    Context.textBaseline = "top";
    Context.fillText( this.healthPoint, this.monsterOff.x+20, this.monsterOff.y-40 ); //몬스터 체력바

    this.monsterOff.Render( Context ); // 몬스터 그림을 그려줌
}

Monster.prototype.Update = function(){
    this.monsterOff.Update(); //이미지 업데이트
}

Monster.prototype.Invalid = function(){
    if(this.monsterOff.x <280) // 거리가 어느정도 가까워지면 다시 맞기 전 이미지로 복귀
        this.monsterOff.img = resourcePreLoader.GetImage("img/game_monster_off.png");
    this.x = this.monsterOff.x;
    this.y = this.monsterOff.y;
    this.collisionBox = {
        left : this.monsterOff.x, top : this.monsterOff.y,
        right : this.monsterOff.x+50, bottom: this.monsterOff.y+100
    };
}

Monster.prototype.CheckCollision = function(playerData){
    player = playerData.collisionBox;
    if(this.sibou) // 사망 스위치 켜졌을경우 실행되지 않도록 리턴
        return;
    if( this.collisionBox.left < player.right && this.collisionBox.bottom > player.top
        && this.collisionBox.right > player.left && this.collisionBox.top < player.bottom )
    {
        this.monsterOff.x +=200; //맞을때마다 150만큼 밀려남
        this.monsterOff.img = resourcePreLoader.GetImage("img/game_monster_on.png");
        this.healthPoint -= playerData.damage; //플레이어의 데미지만큼 체력계산
        playerData.HPdamage(this.MonterDamage);
        if (this.healthPoint<=0){ //체력이 0보다 낮아지면 사망
            playGameState.Notification("MONSTER_SCORE");
            this.sibou = true;
        }
        console.log(playerData.playerHP);
    }
}