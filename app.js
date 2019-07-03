new Vue({
    el:"#app",
    data:{
        monsterHealth:100,
        playerHealth:100,
        gameIsRunning:false,
        turns:[]
    },
    methods:{
        startGame:function () {
            this.gameIsRunning=true;
            this.monsterHealth=100;
            this.playerHealth=100;
            this.turns=[];
        },
        attack:function(){
            var damage=this.calculateDamage(3,10);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player hit Monster for"+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        specialAttack:function(){
            var damage=this.calculateDamage(10,20);
            this.monsterHealth-=damage;
            this.turns.unshift({
                isPlayer:true,
                text:"Player hit Monster HARD for"+damage
            });
            if(this.checkWin()){
                return;
            }
            this.monsterAttack();
        },
        heal:function(){
            if(this.playerHealth<90){
                this.playerHealth+=10;
                this.turns.unshift({
                    isPlayer:true,
                    text:"Player healed by 10"
                });
            }
            else{
                this.playerHealth=100;
            }
            this.monsterAttack();
        },
        giveUp:function(){
            this.gameIsRunning=false;
        },
        calculateDamage:function(min,max){
            return Math.floor(Math.max(Math.random()*max+1,min));
        },
        monsterAttack:function(){
            damage=this.calculateDamage(5,12);
            this.playerHealth-=damage;
            this.turns.unshift({
            isPlayer:false,
            text:"Monster hit Player for"+damage
            });
            this.checkWin();
        },
        checkWin:function(){
            if(this.monsterHealth<0){
            if(confirm("You Won!New Game Buddy?")){
                this.startGame()
            }else{
                this.gameIsRunning=false;
            }
            return true;
            }else if(this.playerHealth<0){
            if(confirm("You Lost!New Game Buddy?")){
                this.startGame()
            }else{
                this.gameIsRunning=false;
            }
            return true;    
            }
            return false;
        },
        pushTurns:function(){

        }
    }
});