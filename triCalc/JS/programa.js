	var reiksmeVienas = true;	
	var reiksmeDu = true;
	var reiksmeTrys = true;
	var reiksmeKeturi = true;
	var ivKrast;
	var krast = '';
	var a;
	var b;
	var c;
	var alfa;
	var beta;
	var gama;
	var S;
	var P;
	var d;
	var suma;
	var ivKamp;
	var kamp = '';
	var alfar;
	var betar;
	var gamar;
	var paliktiSkaitmenu;
	var apval = 10;
	var sumamax

//==================>Apvalinimas<=======================	
	
function apvalinimas(){
	
	var pasirinkimas = document.duomenys.apv.selectedIndex;
	
	pasirinkimas += 1;
	
	if(pasirinkimas == 1){
	document.getElementById('zodis').innerHTML = 'skaitmenį';
	
	}
	else if(pasirinkimas <= 9){
	document.getElementById('zodis').innerHTML = 'skaitmenis';
	}
	else{
	document.getElementById('zodis').innerHTML = 'skaitmenų';
	}
	
	apval = Math.pow(10,pasirinkimas);
	
	}
	
//==========================================================
	
//==================>Trinti<=======================		
		
	function trinti(x){
		document.duomenys.elements[x].value = ' ';
	}
		
//==========================================================

//==================>TrintiVisus<=======================		
		
	function trintiVisus(){
		for(var i = 0; i <= 5; i++){
			document.duomenys.elements[i].value = ' ';
		}
		document.getElementById('S').innerHTML = ' ';
		document.getElementById('P').innerHTML = ' ';
	}
		
//==========================================================

//==================>Ar skaiciai<=======================
		
	function arSkaiciai(){
		
		a = document.duomenys.a.value * 1;
		b = document.duomenys.b.value * 1;
		c = document.duomenys.c.value * 1;
		alfa = document.duomenys.alfa.value * 1;
		beta = document.duomenys.beta.value * 1;
		gama = document.duomenys.gama.value * 1;
		/*
		S = document.duomenys.S.value * 1;
		P = document.duomenys.P.value * 1;
		*/
		
		if(isNaN(a) == true || isNaN(b) == true || isNaN(c) == true || isNaN(alfa) == true || isNaN(beta) == true || isNaN(gama) == true){
				alert('Įveskite tik skaičius!');
				reiksmeVienas = false;
			}
		else{			
		reiksmeVienas = true;
		}
		// alert('reiksmeVienas = '+reiksmeVienas);
		}
		
//==========================================================
		
//==================>Pagal krastines<=======================	
		
	function arTrikampisPagalKrastines(){
		
		var a = (document.duomenys.a.value) * 1;
		var b = (document.duomenys.b.value) * 1;
		var c = (document.duomenys.c.value) * 1;
		var aminub;
		var aminusc;
		var bminusc;
		
		if(a != 0 && b != 0 && c != 0){
		
		if(a > b){
			aminusb = a - b;
			}
		else{
			aminusb = b - a;
			}
			
		if(a > c){
			aminusc = a - c;
			}
		else{
			aminusc = c - a;
			}
		
		if(b > c){
			bminusc = b - c;
			}
		else{
			bminusc = c - b;
			}
		
			
			if(((c > aminusb) && c < (a + b)) && ((b > aminusc) && b < (a + c)) && ((a > bminusc) && a < (b + c))){
				reiksmeDu = true;
				}
			else{
				alert('Trikampis su tokiais kraštinių ilgiais yra negalimas!');
			reiksmeDu = false;
				}
		}
		
		// alert('reiksmeDu = '+reiksmeDu);
		}

//==========================================================

//==================>Pagal kampus<=========================	
		
	function arTrikampisPagalKampus(){
		
		reiksmeTrys = true;
		
		alfa = document.duomenys.alfa.value*1;
		beta = document.duomenys.beta.value*1;
		gama = document.duomenys.gama.value*1;
		
		sumamax = alfa + beta + gama;
		
		//reiksmeTrys = true;
		
		if(alfa != 0 && beta != 0 && gama != 0){
			suma = alfa + beta + gama;
			}	
		
		if(suma < 180 || sumamax > 180){
				alert('Suma = '+suma+'\nSumaMax = '+sumamax);
				alert('Trikampio kampų suma turi būti 180 laipsnių. Dabar suma yra: '+suma+' laipsnių');
				reiksmeTrys = false;
			}
		else if(suma == 180){
			reiksmeTrys = true;
			}
			
			
		// alert('reiksmeTrys = '+reiksmeTrys);
		
		}
//==========================================================		

//==================>Ar yra krastine<========================	

function arYraKrastine(){
	
	/*
	
	var a = document.duomenys.a.value;
	var b = document.duomenys.b.value;
	var c = document.duomenys.c.value;
	
	*/

	
	if(a != 0 && b != 0 && c != 0){
			ivKrast = 3;
			krast = 'abc';
		}
	else if(a != 0 && b != 0){
		 	ivKrast = 2;
			krast = 'ab';
		}
	else if(a != 0 && c != 0){
		 	ivKrast = 2;
			krast = 'ac';
		}
	else if(b != 0 && c != 0){
		 	ivKrast = 2;
			krast = 'bc';
		}
	else if(a != 0){
			ivKrast = 1;
			krast = 'a';
		}
	else if(b != 0){
			ivKrast = 1;
			krast = 'b;'
		}
	else if(c != 0){
			ivKrast = 1;
			krast = 'c';
		}
	
	else{
			ivKrast = 0;
		}
		
	// alert('Ivesta krastiniu: '+ivKrast+'\nIvestos krastines: '+krast);
	
	}
	
//==========================================================

function arYraKampai(){
	if(alfa != 0 && beta != 0 && gama != 0){
		ivKamp = 3;
		kamp = 'abg';
		}
	else if(alfa != 0 && beta != 0){
		 	ivKamp = 2;
			kamp = 'ab';
		}
	else if(alfa != 0 && gama != 0){
		 	ivKamp = 2;
			kamp = 'ag';
		}
	else if(beta != 0 && gama != 0){
		 	ivKamp = 2;
			kamp = 'bg';
		}
	else if(alfa != 0){
			ivKamp = 1;
			kamp = 'a';
		}
	else if(beta != 0){
			ivKamp = 1;
			kamp = 'b;'
		}
	else if(gama != 0){
			ivKamp = 1;
			kamp = 'g';
		}
	
	else{
			ivKamp = 0;
		}
		
	// alert('Ivesta kampu: '+ivKamp+'\nIvesti kampai: '+kamp);
		
	}
	
//==================>laipsniai i radianus<===================
	
function laipsniaiIrad(){
		alfar = (alfa * Math.PI) / 180;
		betar = (beta * Math.PI) / 180;
		gamar = (gama * Math.PI) / 180;
		
		// alert(alfa+'laipsniu = '+alfar+' rad\n'+beta+'laipsniu = '+betar+' rad\n'+gama+'laipsniu = '+gamar+' rad');
		
	}
	
//==========================================================

//==================>radianai i laipsnius<===================
	
function radIlaipsnius(){
		alfa = (180 * alfar) / Math.PI;
		beta = (180 * betar) / Math.PI;
		gama = (180 * gamar) / Math.PI;
		
		// alert(alfar+' rad = '+alfa+' laipsniu\n'+betar+' rad = '+beta+' laipsniu\n'+gamar+' rad = '+gama+' laipsniu');
		
	}
	
//==========================================================

//==================>Krastiniu skaiciavimas<========================
	
	function skaiciuokKrastines(){
		skaiciuokA();
		skaiciuokB();
		skaiciuokC();
		}
	
	//------------------>> a <<--------------------------------------

	function skaiciuokA(){
			if(b != 0 && c != 0 && alfa != 0){
					a = Math.sqrt(Math.pow(b,2) + Math.pow(c,2) - 2 * b * c * Math.cos(alfar));
				}
			else if(b != 0 && alfa != 0 && beta != 0){
					a = (b * Math.sin(alfar)) / Math.sin(betar);
				}
			else if(c != 0 && alfa != 0 && gama != 0){
					a = (c * Math.sin(alfar)) / Math.sin(gamar);
				}
			document.duomenys.a.value = Math.round(a * apval) / apval;
		}
	//----------------------------------------------------------------
	
	//------------------>> b <<--------------------------------------

	function skaiciuokB(){
			if(a != 0 && c != 0 && beta != 0){
					b = Math.sqrt(Math.pow(a,2) + Math.pow(c,2) - 2 * a * c * Math.cos(betar));
				}
			else if(a != 0 && alfa != 0 && beta != 0){
					b = (a * Math.sin(betar)) / Math.sin(alfar);
				}
			else if(c != 0 && beta != 0 && gama != 0){
					a = (c * Math.sin(betar)) / Math.sin(gamar);
				}
			document.duomenys.b.value = Math.round(b * apval) / apval;
		}
	//----------------------------------------------------------------
	
	//------------------>> c <<--------------------------------------

	function skaiciuokC(){
			if(a != 0 && b != 0 && gama != 0){
					c = Math.sqrt(Math.pow(a,2) + Math.pow(b,2) - 2 * a * b * Math.cos(gamar));
				}
			else if(a != 0 && alfa != 0 && gama != 0){
					c = (a * Math.sin(gamar)) / Math.sin(alfar);
				}
			else if(b != 0 && beta != 0 && gama != 0){
					c = (b * Math.sin(gamar)) / Math.sin(betar);
				}
			document.duomenys.c.value = Math.round(c * apval) / apval;
		}
	//----------------------------------------------------------------
	
//==========================================================

//==================>kampu skaiciavimas<====================

function skaiciuokKampus(){
	
	if(a != 0 && b != 0 && c != 0){
			alfar = Math.acos((Math.pow(a,2) - Math.pow(b,2) - Math.pow(c,2)) / (-2 * b * c));
			alfa = (180 * alfar) / Math.PI;	
			document.duomenys.alfa.value = Math.round(alfa * apval) / apval;
			
			betar = Math.acos((Math.pow(b,2) - Math.pow(a,2) - Math.pow(c,2)) / (-2 * a * c));
			beta = (180 * betar) / Math.PI;	
			document.duomenys.beta.value = Math.round(beta * apval) / apval;
			
			gamar = Math.acos((Math.pow(c,2) - Math.pow(b,2) - Math.pow(a,2)) / (-2 * a * b));
			gama = (180 * gamar) / Math.PI;
			document.duomenys.gama.value = Math.round(gama * apval) / apval;
		}

//------------------------------------------------------------------------------------------------
		
	else if(a != 0 && beta != 0 && b != 0){
			alfar = Math.asin((a * Math.sin(beta)) / b);
			alfa = (180 * alfar) / Math.PI;	
			document.duomenys.alfa.value = Math.round(alfa * apval) / apval;
		}
	else if(a != 0 && gama != 0 && c != 0){
			alfar = Math.asin((a * Math.sin(gama)) / c);
			alfa = (180 * alfar) / Math.PI;	
			document.duomenys.alfa.value = Math.round(alfa * apval) / apval;
		}
		
//--------------------------------------------------------------------------------------------------------
	
	else if(a != 0 && alfa != 0 && b != 0){
			betar = Math.asin((b * Math.sin(alfa)) / a);
			beta = (180 * betar) / Math.PI;	
			document.duomenys.beta.value = Math.round(beta * apval) / apval;
		}
	else if(b != 0 && gama != 0 && c != 0){
			betar = Math.asin((b * Math.sin(gama)) / c);
			beta = (180 * betar) / Math.PI;	
			document.duomenys.beta.value = Math.round(beta * apval) / apval;
		}
		
//--------------------------------------------------------------------------------------------------------
	
	else if(a != 0 && alfa != 0 && c != 0){
			gamar = Math.asin((c * Math.sin(alfa)) / a);
			gama = (180 * gamar) / Math.PI;
			document.duomenys.gama.value = Math.round(gama * apval) / apval;	
		}
	else if(b != 0 && beta != 0 && c != 0){
			gamar = Math.asin((c * Math.sin(beta)) / b);
			gama = (180 * gamar) / Math.PI;	
			document.duomenys.gama.value = Math.round(gama * apval) / apval;
		}
		
//--------------------------------------------------------------------------------------------------------	
	
	else if(beta != 0 && gama != 0){
			alfa = 180 - beta - gama;
			alfar = (alfa * Math.PI) / 180;
			document.duomenys.alfa.value = Math.round(alfa * apval) / apval;
		}	
	
	else if(alfa != 0 && gama != 0){
			beta = 180 - alfa - gama;
			betar = (beta * Math.PI) / 180;
			document.duomenys.beta.value = Math.round(beta * apval) / apval;
		}
	
	else if(alfa != 0 && beta != 0){
			gama = 180 - alfa - beta;
			gamar = (gama * Math.PI) / 180;
			document.duomenys.gama.value = Math.round(gama * apval) / apval;
		}
	
	
		
		
		
	}

//==========================================================

//==================>skaiciuokSirP<========================
	
function skaiciuokSirP(){
		if(a !=0 && b != 0 && c != 0){
			
				P = a + b + c;
				d = P / 2;
				S = Math.sqrt(d*(d - a)*(d - b)*(d - c));
				
				
				document.getElementById('S').innerHTML = Math.round(S * apval) / apval;
				document.getElementById('P').innerHTML = Math.round(P * apval) / apval;
			}
	}
	
//==========================================================

//==================>Skaiciuoti<============================
		
	function skaiciuoti(){
		arSkaiciai();
		if(reiksmeVienas == true){
			arTrikampisPagalKrastines();
			arTrikampisPagalKampus();
				if(reiksmeDu == true && reiksmeTrys == true){
					arYraKrastine();
					arYraKampai();
					
						if(((ivKrast + ivKamp) < 3) || ivKrast == 0){
							alert('Įveskite bent tris duomenis, iš kurių bent vienas būtų kraštinės ilgis.');
							}
						else{
							laipsniaiIrad();
							radIlaipsnius();
								if(a != 0 && b!= 0 && c != 0){
									skaiciuokKampus();
									
								}
								else{
									skaiciuokKampus();
									skaiciuokKrastines();
										
										if(a == 0 || b == 0 || c == 0){
												skaiciuokKrastines();
											}
										else if(alfa == 0 || beta == 0 || gama == 0){
												skaiciuokKampus();
											}
											
									}
							
							skaiciuokSirP();
							}
				}
		}
		
		}
		
//==========================================================
