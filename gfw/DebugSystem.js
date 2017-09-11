function DebugSystem()
{
    this.debugMode = true;
    this.useAlert = false;
    return this;
}

DebugSystem.prototype.Log = function( type , msg )
{    
    if( this.debugMode == false )
        return;
    
    if (typeof console == "undefined")
        return;
   
    switch( type )
    {
      case "LOG":
      console.log( msg );
      break;  
      case "WARN":
      console.warn( msg );
      break;  
      case "ERROR":
      if( this.useAlert )
        alert( msg );
      console.error( msg );
      break;  
    };
}

DebugSystem.prototype.UseDebugMode = function()
{    
    if( inputSystem.isKeyDown( 27 ) && inputSystem.isKeyDown( 32 ) )
        this.debugMode = !this.debugMode;
}

var debugSystem = new DebugSystem;

