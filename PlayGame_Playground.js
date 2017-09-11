/**
 * Created by 완두콩 on 2017-02-16.
 */
function PGPlayground(){
    this.imgBox01 = resourcePreLoader.GetImage("img/game_box01.png");
    this.imgBox02 = resourcePreLoader.GetImage("img/game_box02.png");
    this.imgBox03 = resourcePreLoader.GetImage("img/game_box03.png");
    this.crater = resourcePreLoader.GetImage("img/game_crater.png");
    this.monsterOff = resourcePreLoader.GetImage("img/game_monster_off.png");


    this.intBoxY = 600 - 139; // 플레이어가 밟는 박스의 위치 / 139는 박스의 세로 크기 전체 - 박스크기 하면 보임
    this.intCraterY = 600 - 186 -30; // 구덩이는 투명 이미지로 이루어져있어서 위로 약간 튀어나오게 했다. 투명한 무언가에 맞으면 사망
                                        // 거기에 부딪혔다는건 점프를 안했다는 뜻이니까

    this.arrObjects = new Array(); // 맵이 이루어지는 순서를 담는 배열
    this.num = Math.floor(Math.random()+2); // 몬스터를 랜덤으로 꺼내기 위한 함수

    this.AddObject('start');

    for( var i = 0 ; i < 5 ; i++)
        this.AddObject('box');

    this.AddMonster('monster');

    if( this.num == 2 ) {
        for( var i = 0 ; i < 5 ; i++)
            this.AddObject('box');

        this.AddMonster('monster');
    }

    this.AddItem('Item');

    for( var i = 0 ; i < 3 ; i++)
        this.AddObject('box');

    this.AddObject('end');

    this.AddObject('crater');
}

PGPlayground.prototype.GotoLastPosition = function( obj ){
    if (obj.type == 'box') { // 타입을 들고와서 박스일 경우
        if(this.lastObj.type == 'crater') // 마지막 오브젝트가 구덩이이면
            obj.SetPosition(this.lastObj.x+97, this.intBoxY ); // 구덩이의 넓이를 줌
        else
            obj.SetPosition(this.lastObj.x + 261, this.intBoxY); //아니면 그냥 갑시다
    }
    else if(obj.type == 'crater'){// 타입이 구덩이이면
        obj.SetPosition(this.lastObj.x + 261 , this.intCraterY); // 다음 박스크기대로 이어줍시다
    }else if( obj.type == 'monster' ){ // 몬스터일 경우
        obj.sibou = false; // 사망플래그 false설정
        obj.healthPoint = 10;
        if( this.lastObj.type == 'box' ){ // 마지막이 박스이면
            obj.SetPosition(this.lastObj.x , 323 ); // 마지막 오브젝트와 플레이어와 같은 높이 서줌
        }else if( this.lastObj.type == 'crater' ){ // 마지막이 구덩이이면
            obj.SetPosition( this.lastObj.x + 100, 323 ); // 그 위에 몬스터가 올라가면 안되니까 x값을 100을 더 추가
        }
    } else if( obj.type == 'Item' ){
        obj.isGet = false;
        if( this.lastObj.type == 'box' ){ // 마지막이 박스이면
            obj.SetPosition(this.lastObj.x, this.intBoxY-300); // 마지막 오브젝트와 플레이어와 같은 높이 서줌
        }else if( this.lastObj.type == 'crater' ){ // 마지막이 구덩이이면
            obj.SetPosition( this.lastObj.x, this.intCraterY-300 );
        }
    }
}

PGPlayground.prototype.AddObject = function( type ){
    var obj;

    if(type == 'start'){ // 타입을 들고와서 직접 비교
        obj = new GraphicObject( this.imgBox01 ); //변수에 이미지를 넣고
        obj.SetPosition( 0 , this.intBoxY ); // 이미지의 위치를 설정
        obj.type = 'box'; // 타입도 지정

        if( this.lastObj ){ // 마지막 오브젝트가 있으면 아래의 메소드 실행
            this.GotoLastPosition( obj );
        }
    }
    else if(type == 'box'){
        obj = new GraphicObject( this.imgBox02 );
        obj.SetPosition( 0 , this.intBoxY );
        obj.type = 'box';
        if( this.lastObj ){
            this.GotoLastPosition( obj );
        }
    }
    else if(type == 'end'){
        obj = new GraphicObject( this.imgBox03 );
        obj.SetPosition( 0 , this.intBoxY );
        obj.type = 'box';

        if( this.lastObj ){
            this.GotoLastPosition( obj );
        }
    }
    else if(type == 'crater'){
        obj = new GraphicObject( this.crater );
        obj.SetPosition( 0 , this.intCraterY );
        obj.type = 'crater';

        if( this.lastObj ){
            this.GotoLastPosition( obj );
        }
    }
    this.arrObjects.push( obj ); // 순서를 지정해주는 배열에 내가 가진 객체를 넣어준다
    this.lastObj = obj; // 마지막 객체는 현재 넣어준 객체
}

PGPlayground.prototype.CheckCollision = function( playerData ){
    player = playerData.collisionBox;
    for(var i = 0; i < this.arrObjects.length; i++){ // 구덩이에 빠진걸 체크해준다.
        var obj = this.arrObjects[i]; // 변수에 배열의 현재 정보값을 넣어준다.
        if(obj.type == 'crater'){ // 현재 타입이 구덩이일 경우
            var collisionBox
                = {left: obj.x + 15,top : obj.y + 10, right: obj.x + 85, bottom: obj.y + 175 };
            // 구덩이의 충돌박스를 지정해줌
            if( collisionBox.left < player.right && collisionBox.bottom > player.top
                && collisionBox.right > player.left && collisionBox.top < player.bottom )
            {
                playGameState.Notification("COLLISION_ELEGATOR");
                debugSystem.Log('Log','충돌');
                //구덩이의 충돌박스와 플레이어의 충돌박스를 비교하여 부딪혔따고 판단될 경우 위와 같은 정보를 보냄
            }
        }
        if(obj.type == 'monster'){
            obj.CheckCollision(playerData);
        }
        if(obj.type == 'Item'){
            obj.CheckCollision(playerData);
        }
    }
}

PGPlayground.prototype.AddMonster = function( type ){
    var obj;

    if(type == 'monster')//타입을 들고와서 몬스터일 경우
    obj = new Monster();// 몬스터 객체를 생성
    if(this.lastObj)//마지막 오브젝트가 있을 경우 아래를 실행
        this.GotoLastPosition( obj );

    this.arrObjects.push( obj );// 배열에 현재 객체를 넣어줌
}

PGPlayground.prototype.AddItem = function( type ){
    var obj;
    if(type == 'Item') {
        obj = new Item();
        if (this.lastObj)
            this.GotoLastPosition(obj);
    }

    this.arrObjects.push( obj );
}

PGPlayground.prototype.Render = function(){
    var theCanvas = document.getElementById("GameCanvas");
    var Context = theCanvas.getContext("2d");

    for(var i = 0; i < this.arrObjects.length ; i++){
        this.arrObjects[i].Render( Context );//배열 전체를 그려줌
    }
}

PGPlayground.prototype.Update = function(){
    var speed = 15;

    for(var i = 0; i < this.arrObjects.length; i++){
        var obj = this.arrObjects[i];
        obj.Translate( -speed, 0);
        if(obj.x < -261 ) {
            this.GotoLastPosition( obj );
            obj.Translate( -speed, 0 );
            if( obj.type != 'monster' )
                this.lastObj = obj;
            if( obj.type != 'Item' )
                this.lastObj = obj;
        }
    }
    this.arrObjects.sort( function( obj1, obj2 ){ return obj1.x - obj2.x});
}