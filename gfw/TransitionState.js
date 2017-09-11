function TransitionFadeOut( prevState , nextState, delay )
{ 
    this.prevState = prevState;
    this.nextState = nextState;
    this.delay = delay;
    
    this.alpha = 0;
}

TransitionFadeOut.prototype.Render = function( )
{
    // 그리기
    var theCanvas = document.getElementById("GameCanvas");
    var context  = theCanvas.getContext("2d");

    this.prevState.Render();
    
    var oldAlpha    = context.globalAlpha;
    var oldFillStyle = context.fillStyle;
    
    context.globalAlpha  = this.alpha/255;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, 800, 600); 
    context.globalAlpha  = oldAlpha;
    context.fillStyle = oldFillStyle;
}


TransitionFadeOut.prototype.Update = function()
{
    this.alpha += this.delay;
    if( this.alpha >= 255 )
    {
        ChangeGameState( this.nextState );
    }
}


function TransitionFadeIn( prevState , nextState, delay )
{ 
    this.prevState = prevState;
    this.nextState = nextState;
    this.delay = delay;
    
    this.alpha = 255;
}

TransitionFadeIn.prototype.Render = function( )
{
    // 그리기
    var theCanvas = document.getElementById("GameCanvas");
    var context  = theCanvas.getContext("2d");

    this.nextState.Render();
    
    var oldAlpha = context.globalAlpha;
    var oldFillStyle = context.fillStyle;
    
    context.globalAlpha  = this.alpha/255;
    context.fillStyle = "#000000";
    context.fillRect(0, 0, 800, 600); 
    context.globalAlpha  = oldAlpha;
    context.fillStyle = oldFillStyle;
}

TransitionFadeIn.prototype.Update = function()
{
    this.alpha -= this.delay;
    if( this.alpha <= 0 )
    {
        ChangeGameState( this.nextState );
    }
}
