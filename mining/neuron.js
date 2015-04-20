/*Guitared Neuron Network version 1.0*/
//config
var ISLOG = false; //linear or log sigmoid
var n = -0.02; //eta

//Fixed value
var w=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
var wb = [0,0,0,0];
var we = [0,0,0,0];
function rr(){
w[1][1] = rand(-1,1); w[1][2] = rand(-1,1); w[1][3] = rand(-1,1);
w[2][1] = rand(-1,1); w[2][2] = rand(-1,1); w[2][3] = rand(-1,1);
w[3][1] = rand(-1,1); w[3][2] = rand(-1,1); w[3][3] = rand(-1,1);
w[4][1] = rand(-1,1); w[4][2] = rand(-1,1); w[4][3] = rand(-1,1);
w[5][1] = rand(-1,1); w[5][2] = rand(-1,1); w[5][3] = rand(-1,1);
w[6][1] = rand(-1,1); w[6][2] = rand(-1,1); w[6][3] = rand(-1,1);
w[7][1] = rand(-1,1); w[7][2] = rand(-1,1); w[7][3] = rand(-1,1);
w[8][1] = rand(-1,1); w[8][2] = rand(-1,1); w[8][3] = rand(-1,1);
w[9][1] = rand(-1,1); w[9][2] = rand(-1,1); w[9][3] = rand(-1,1);
w[10][1] = rand(-1,1); w[10][2] = rand(-1,1); w[10][3] = rand(-1,1);
w[11][1] = rand(-1,1); w[11][2] = rand(-1,1); w[11][3] = rand(-1,1);
w[12][1] = rand(-1,1); w[12][2] = rand(-1,1); w[12][3] = rand(-1,1);
w[13][1] = rand(-1,1); w[13][2] = rand(-1,1); w[13][3] = rand(-1,1);
wb = [rand(-1,1),rand(-1,1),rand(-1,1),rand(-1,1)];
we = [rand(-1,1),rand(-1,1),rand(-1,1),rand(-1,1)];
}
//input
var inputs = input_data;

function e(id){return  parseFloat(document.querySelector(id).value);}
function rand(min,max){return Math.random() * (max-min) + min;}
function update(){
	rr();
	//weight
	for(i=1;i<=13;i++){
		document.querySelector("#w"+i+"t1").value = w[i][1];
		document.querySelector("#w"+i+"t2").value = w[i][2];
		document.querySelector("#w"+i+"t3").value = w[i][3];
	}
	//bias
	document.querySelector("#bs").value = wb[0];
	document.querySelector("#b1").value = wb[1];
	document.querySelector("#b2").value = wb[2];
	document.querySelector("#b3").value = wb[3];
	
	//hidden layer weight
	document.querySelector("#we1").value = we[1];
	document.querySelector("#we2").value = we[2];
	document.querySelector("#we3").value = we[3];
	
}
function filldata(z){
	document.querySelector("#loop").value = loop;
	document.querySelector("#ind").value = z;
	document.querySelector("#cl").value = input_data[z][0];
	for(i=1;i<=13;i++){
		document.querySelector("#inpt"+i).value = input_data[z][i];
	}
}
function sumh(x){
	var sum = wb[x];
	for(i=1;i<=13;i++){
			sum+= e("#inpt"+i)*w[i][x];
	}
	document.querySelector("#s"+x).value =sum;
	document.querySelector("#e"+x).value =actfunc(sum);
	
}
function sums(){
	var sum = wb[0];
	sum+= e("#e1")*e("#we1");
	sum+= e("#e2")*e("#we2");
	sum+= e("#e3")*e("#we3");
	document.querySelector("#ss").value =sum; //fill output
	//Error
	document.querySelector("#err").value = e("#cl") - sum; //calculate error
	//inspec run 
	eeee = parseFloat(e("#err"));
	esum += eeee;
	if(eeee<0.33)truee+=1;
	if(eeee>emax)emax = eeee;
	if(eeee<emin)emin = eeee;
}
/*
ds
d1
d2
d3

*/
function backward(){
	//calculate d
	document.querySelector("#ds").value = ds(e("#err"),e("#ss")); 
	document.querySelector("#de1").value = d(1,e("#e1")); 
	document.querySelector("#de2").value = d(2,e("#e2")); 
	document.querySelector("#de3").value = d(3,e("#e3")); 
	
	//edit weight
	editws(1);
	editws(2);
	editws(3);
	for(i=1;i<=13;i++){
		editw(i,1);
		editw(i,2);
		editw(i,3);
	}
	
	//edit bias
	editbs(0); //output layer bias
	editbs(1);
	editbs(2);
	editbs(3);
}

function ds(ee,y){ //output layer
	if( ! ISLOG)
		return ee;			//linear
	return ee*y*(1-y);	//log sigmoid
}
function d(i,y){ //hidden layer
	if( ! ISLOG)
		return e("#ds")*e("#we"+i);			//linear
	return y*(1-y)*e("#ds")*e("#we"+i);		//log sigmoid
}
function editbs(i){
	if(i==0){
		document.querySelector("#bs").value = e("#bs") - (n*e("#ds"));return; //output bias;
	}
	document.querySelector("#b"+i).value = e("#b"+i) - (n*e("#de"+i));
}
function editws(i){
	document.querySelector("#we"+i).value = e("#we"+i) - (n*e("#ds")*e("#e"+i));
}
function editw(i,j){
	document.querySelector("#w"+i+"t"+j).value = e("#w"+i+"t"+j) - (n*e("#de"+j)*e("#inpt"+i));
}
function actfunc(a){ //activation function
	if( ! ISLOG)
	//linear
	return a;
	//log sigmoid
	return 1/1+Math.exp(a);
}
function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if ((new Date().getTime() - start) > milliseconds){
      break;
    }
  }
}