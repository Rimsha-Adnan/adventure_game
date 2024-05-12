#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.italic.yellow(`\t\t${"=".repeat(70)}`));
console.log(chalk.bold.italic.yellow.magenta("\t\t>>>>>>>>>>>>>>>> Welcome To RIMSHA Adventure Game <<<<<<<<<<<<<<<<<<"));
console.log(chalk.bold.italic.yellow(`\t\t${"=".repeat(70)}`));


class Game{
    player_name : string;

    constructor (){
        this.player_name = ""
    }

   async get_player_name(name : string){
        this.player_name = name
    }

    async game_obj(){
        let random = Math.random()

    // enemy variables 
    let enemies: string[] = ["Skeleton", "Zombie", "Warrior", "Assassin"];
    let maxEnemyHealth: number = 100;
    let maximumHealthDamage: number = 25;

    // Player variables
    let health: number = 100;
    let attackDamage: number = 50;
    let numberOfHealthPotions: number = 4;
    let healthPotionAmount: number = 15;
    let healthPerDropChance: number = 50;

    let running: boolean = true;
        while(running){
            let opponenthealth : number = Math.floor(random * maxEnemyHealth)
            let enemy = enemies[Math.floor(random * enemies.length)]

            console.log(chalk.italic.magenta(`\n\t${this.player_name.toUpperCase()} Enemy ${chalk.yellow(enemy.toUpperCase())} Has Appeared \n`));
            
            while(opponenthealth > 0 ){
                console.log(chalk.rgb(132,908,65).italic(`\n\t\t${this.player_name.toUpperCase()} Hp Is "${health}" \n`));
                console.log(chalk.rgb(132,908,65).italic(`\n\t\tEnemy ${enemy.toUpperCase()} Hp Is "${opponenthealth}" \n`));
                
                

                let actions =  await action()

                switch(actions.action){
                    case "Attack":
                        let GivenDamage : number = Math.floor(random * attackDamage )
                        let takenDamage : number = Math.floor(random * maximumHealthDamage )

                        opponenthealth -= GivenDamage
                        health -=  takenDamage

                        console.log(chalk.yellow.italic(`\n\t\t${this.player_name.toUpperCase()} You Strike The ${enemy.toUpperCase()} For "${chalk.green(GivenDamage)}" \n`));
                        console.log(chalk.yellow.italic(`\n\t\tYou Take "${chalk.red(takenDamage)}" Damage In Return\n`));

                        if(health < 1){
                            console.log(chalk.bold.red(`\n\t\t.....Your Health Is Low!!!!!.....\n`));
                            
                        }
                        break;

                    case "Drink Health Potion":
                        if(numberOfHealthPotions > 0){
                            if(health <= 90 ){
                                health += healthPotionAmount
                                numberOfHealthPotions--
                                console.log(chalk.magenta.italic(`\n\t\t${this.player_name.toUpperCase()} You Drink A Health Portion For "${chalk.yellow(healthPotionAmount)}"\n `));
                                console.log(chalk.magenta.italic(`\n\t\t${this.player_name.toUpperCase()} Now You Have  "${chalk.yellow(health)}" Hp \n`));
                                console.log(chalk.magenta.italic(`\n\t\t${this.player_name.toUpperCase()} Now You Have "${chalk.yellow(numberOfHealthPotions)}" Potions Left\n`));
                            }else{
                                console.log(chalk.bgGreen.italic(`\n\t\t------Your Hp Is Already Full---------\n`));
                                
                            }
                        }else{
                        console.log(chalk.red.italic(`\n\t\tYou Have Zero Potion Left...Defeat Enemy To Get A Chance Of One Health Potion\n`));
                            
                        }
                        break;

                    case "Run":
                        console.log(chalk.red.italic(`\n\t\tYou Run Away From The Enemy ${enemy.toUpperCase()} \n`));
                        break;
                    default:
                            console.log(chalk.rgb(255,0,0).italic("\n\t\tInvalid Action.\n"));
                            running = false
                            break;
                        
                }
                
            }
         if (health < 2 ){
                console.log(chalk.italic.red.bold(`\n\t\t-------${this.player_name.toUpperCase()} You Lose The Game!!------- \n`));
                break
                
            }
            
         if(opponenthealth <= 0 ){
                console.log(chalk.italic.bold.green(`\n\t\t>>>>>>>>>>>..Congratulation! ${this.player_name.toUpperCase()} You Won The Game!..<<<<<<<<<<<\n`));

                console.log(chalk.italic.rgb(78,98,342)(`\n\t\t>>>>>>>//${enemy.toUpperCase()} Defeated\\<<<<<<<\n`));
                console.log(chalk.italic.rgb(456,89,211)(`\n\t\t **********${this.player_name.toUpperCase()} Your Hp Is "${health}"**********\n`));

                if(random * 100 > healthPerDropChance){
                    healthPotionAmount ++ 
                    console.log(chalk.italic.rgb(103,561,68)(`\n\t\t${enemy.toUpperCase()} Dropped A Health Potion\n`));
                    console.log(chalk.italic.rgb(345,876,33)(`\n\t\tNow You Have "${numberOfHealthPotions}"  Health Potion\n`));
                    

                }
                
        
         let  answer = await asking()
                    
                    switch(answer.ask){
                        case "Want To Continue":
                            console.log(chalk.italic.yellow(`\n\t\t-------${this.player_name.toUpperCase()} You Are Continue On Your Adventure-------\n`));
                            
                            break;

                        case  "Exit" :
                            console.log(chalk.bold.italic.rgb(566,767,832)("\n\t\t\tTHANK YOU FOR PLAYING ...I HOPE YOU ENJOYED IT.....!!!\n"));
                            
                            
                            running = false
                    }
                        
                           
            }
                
                




                


        }
    }
}

let game = new Game()

 async function getPlayerName(){
    let ans = await inquirer.prompt(
        [
            {
                name: "name",
                type : "input",
                message :chalk.italic.rgb(123,67,189) ("Please Enter Your Name"),
                validate:(input) => /^[A-Za-z\s]+$/.test(input) ? true : "Please Enter Only Alphbatical Character"
            }
        ]
    )
    game.get_player_name(ans.name)

 }
 async function action() {
    let ans = await inquirer.prompt(
        [
            {
                name : "action",
                type : "list",
                message : chalk.italic.rgb(123,67,189)("What Action You Perform"),
                choices : [
                    "Attack",
                    "Drink Health Potion",
                    "Run" ],
            }
            
        ]
    )
    return ans
}
 async function asking() {
    let ans =  await inquirer.prompt(
        [
            {
                name : "ask",
                type : "list",
                message :chalk.italic.rgb(123,67,189) ("What Do You Want To Do"),
                choices : [
                    "Want To Continue",
                    "Exit" ]
            }
        ]
    )
    return ans
    
}

 
 async function main(){
    await getPlayerName()
    game.game_obj()
 }
 main()
 





