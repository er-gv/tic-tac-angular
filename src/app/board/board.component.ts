import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})

export class BoardComponent implements OnInit {

	xIsNext: boolean;
	squares: any[];
	winner: string;
	player: string;

	constructor() { 
  	
  	}

	public newGame(){
		this.winner = null;
	  	const whoStarts = this.pick_new_player()
  		this.xIsNext = (whoStarts=='O');
  		this.squares = Array(9).fill(null);
  		this.player = whoStarts;
  		console.log(`@newGame. squeres: ${this.squares}`);
  	}

  	public get_player(): string {
		  let y = 6;
  		return this.xIsNext?'O':'X';
  	}
 

	public make_move(idx: number){
		console.log(`@make_move. winner:${this.winner}, idx: ${idx}`)
		if(!this.winner && idx>=0 && idx<9 && null == this.squares[idx]){
			
			this.squares.splice(idx, 1, this.get_player());
			this.xIsNext = !this.xIsNext;
			this.player = this.get_player();
			this.winner = this.testVictoryState();
		}	
	}

	public pick_new_player(): 'X'|'O' {
		const num = Math.random();
		const player = (num<0.5?'X':'O');
		return player;
	}

	private testVictoryState(): string {
		
		//test rows
		const paths: Array <number[]> = [
			[0,1,2],[3,4,5],[6,7,8],
			[0,3,6],[1,4,7],[2,5,8],
			[0,4,8],[2,4,6]
		];
		let result = null;
		for(let p of paths){
			const [a, b, c] = p;
			if(this.squares[a]&&this.squares[a]==this.squares[b]&&this.squares[a]==this.squares[c]){
				result = this.squares[a];
				break;
			}
		}
		/*if(this.squares[0]==this.squares[1] && this.squares[1]==this.squares[2] && this.) return this.squares[0];
		if(this.squares[3]==this.squares[4] && this.squares[4]==this.squares[5]) return this.squares[3];
		if(this.squares[6]==this.squares[7] && this.squares[7]==this.squares[8]) return this.squares[6];

		//test coloums
		if(this.squares[0]==this.squares[3] && this.squares[3]==this.squares[6]) return this.squares[0];
		if(this.squares[1]==this.squares[4] && this.squares[4]==this.squares[7]) return this.squares[1];
		if(this.squares[2]==this.squares[5] && this.squares[5]==this.squares[8]) return this.squares[3];

		//test diagons
		if(this.squares[0]==this.squares[4] && this.squares[4]==this.squares[8]) return this.squares[0];
		if(this.squares[2]==this.squares[4] && this.squares[4]==this.squares[6]) return this.squares[2];

		*/
		console.log(`@testVictoryState board is ${this.squares}. Winner is ${result}`);
		return result;
	}

	ngOnInit(): void {
		this.newGame();
	}



	

}
