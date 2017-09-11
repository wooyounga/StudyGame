/**
 * Created by 완두콩 on 2017-02-24.
 */
function Item(){
    this.sprItem = new SpriteAnimation(
        resourcePreLoader.GetImage("img/game_item.png"),
        56,75,2,6);
    this.x = 0;
    this.y = 0;
    this.type = 'Item';
    this.isGet = false;
    this.Invalid();
}

Item.prototype.Invalid = function(){
    this.x = this.sprItem.x;
    this.y = this.sprItem.y;
    this.collisionBox =
        {left:this.sprItem.x, top:this.sprItem.y, right:this.sprItem.x+56,bottom:this.sprItem.y+75};
}

Item.prototype.CheckCollision = function( playerData ){
    player = playerData.collisionBox;
    if(this.isGet){
        return;
    }
    if(this.collisionBox.left < player.right && this.collisionBox.bottom > player.top
        && this.collisionBox.right > player.left && this.collisionBox.top < player.bottom){
        debugSystem.Log('LOG','아이템습득');
        playerData.playerHP+=10;
        this.isGet = true;
    }
}

Item.prototype.SetPosition = function(x,y){
    this.sprItem.SetPosition(x,y);
    this.Invalid();
}

Item.prototype.Translate = function(x,y){
    this.sprItem.Translate(x,y);
    this.Invalid();
}

Item.prototype.Render = function(){
    if(this.isGet){
        return;
    }

    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    this.sprItem.Render( Context );
}

Item.prototype.Update = function(){
    this.sprItem.Update();
}