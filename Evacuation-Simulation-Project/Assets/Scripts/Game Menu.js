var isQuit=false;
var isStart=false;
var isOK=false;
var isCameraControls=false;
var isCameraMovement=false;
var isAbout=false;


function OnMouseEnter(){
	//change text color
	renderer.material.color=Color.red;
}

function OnMouseExit(){
	//change text color
	renderer.material.color=Color.white;
}

function OnMouseUp(){
	//is this quit
	if (isQuit==true) {
		//quit the game
		Application.Quit();
	}
	else if(isStart==true){
		//load level
		Application.LoadLevel("A320Scene (No Behaviour)");
//isQuit=false;
//isStart=false;
//isOK=false;
//isCameraControls=false;
//isCameraMovement=false;
//isAbout=false;
	}
	else if(isOK==true){
		//load level
		Application.LoadLevel("Main Menu");
	//	var isQuit=false;
//isStart=false;
//isOK=false;
//isCameraControls=false;
//isCameraMovement=false;
//isAbout=false;
	}
	
		else if(isCameraControls==true){
		//load level
		Application.LoadLevel("Camera Controls");
//isQuit=false;
//isStart=false;
//isOK=false;
//isCameraControls=false;
//isCameraMovement=false;
//isAbout=false;
	}
	
		else if(isCameraMovement==true){
		//load level
		Application.LoadLevel("Camera Movement");
//isQuit=false;
//isStart=false;
//isOK=false;
//isCameraControls=false;
//isCameraMovement=false;
//isAbout=false;
	}
	
		else if(isAbout==true){
		//load level
		Application.LoadLevel("About");
//isQuit=false;
//isStart=false;
//isOK=false;
//isCameraControls=false;
//isCameraMovement=false;
//isAbout=false;
	}
}

function Update(){
	//quit game if escape key is pressed
	if (Input.GetKey(KeyCode.Escape)) {
    		Application.Quit();
	}
}