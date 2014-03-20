var frontCamera: Camera;
var backCamera : Camera;
var leftCamera: Camera;
var rightCamera : Camera;
var topCamera: Camera;
var movingCamera: Camera;
var currentCamera: Camera;



var movingCamPos : Vector3;

 

function Start()

{

  currentCamera = movingCamera;
  currentCamera.enabled = true;
  movingCamPos = transform.position;
}


function Update () {


    if(Input.GetKeyDown("1")){
	    frontCamera.enabled = true;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = frontCamera;
    }
    if(Input.GetKeyDown("2")){
	    frontCamera.enabled = false;
	    backCamera.enabled = true;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = backCamera;
    }
    if(Input.GetKeyDown("3")){
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = true;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = topCamera;
    }
    if(Input.GetKeyDown("4")){
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = true;
	    rightCamera.enabled = false;
	    movingCamera.enabled = false;
	    currentCamera = leftCamera;
}
    if(Input.GetKeyDown("5")){
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = true;
	   	movingCamera.enabled = false;
	   	currentCamera = rightCamera;

    }
    if(Input.GetKeyDown("6")){
	    frontCamera.enabled = false;
	    backCamera.enabled = false;
	    topCamera.enabled = false;
	    leftCamera.enabled = false;
	    rightCamera.enabled = false;
	    movingCamera.enabled = true;
	   	currentCamera = movingCamera;

    }
    // transform.position = frontCamPos;
    if (Input.GetKey(KeyCode.UpArrow)) currentCamera.transform.Translate(Vector3.forward * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.DownArrow)) currentCamera.transform.Translate(Vector3.back * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.LeftArrow)) currentCamera.transform.Translate(Vector3.left * Time.deltaTime * 10);

	if (Input.GetKey(KeyCode.RightArrow)) currentCamera.transform.Translate(Vector3.right * Time.deltaTime * 10);

	//if (Input.GetKey(KeyCode.K)) currentCamera.transform.position = frontCamPos;
	
	
	/*if(currentCamera == movingCamera){
		if (Input.GetKey(KeyCode.LeftShift)) transform.Translate(Vector3.up * Time.deltaTime * 10);
		
		if (Input.GetKey(KeyCode.LeftControl)) transform.Translate(Vector3.down * Time.deltaTime * 10);
		
		if (Input.GetKey(KeyCode.A)) transform.Rotate(0, 1, 0);
		
		if (Input.GetKey(KeyCode.D)) transform.Rotate(0, -1, 0);
		
		if (Input.GetKey(KeyCode.W)) transform.Rotate(1, 0, 0);
		
		if (Input.GetKey(KeyCode.S)) transform.Rotate(-1, 0, 0);
		
		if (Input.GetKey(KeyCode.Q)) transform.Rotate(0, 0, 1);
		
		if (Input.GetKey(KeyCode.E)) transform.Rotate(0, 0, -1);
		if (Input.GetKey(KeyCode.K)) currentCamera.position = movingCamPos;
	}*/
}



