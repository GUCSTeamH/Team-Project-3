//the camera position
var camera_position : Vector3;


//get the start position of a camera so that the user can reset the position if they get lost
function Start(){
	camera_position = transform.position;
}

//keys to support extremely flexible camera movement
function Update () {

if (Input.GetKey(KeyCode.LeftShift)) transform.Translate(Vector3.up * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.LeftControl)) transform.Translate(Vector3.down * Time.deltaTime * 10);

if (Input.GetKey(KeyCode.A)) transform.Rotate(0, 1, 0);

if (Input.GetKey(KeyCode.D)) transform.Rotate(0, -1, 0);

if (Input.GetKey(KeyCode.W)) transform.Rotate(1, 0, 0);

if (Input.GetKey(KeyCode.S)) transform.Rotate(-1, 0, 0);

if (Input.GetKey(KeyCode.Q)) transform.Rotate(0, 0, 1);

if (Input.GetKey(KeyCode.E)) transform.Rotate(0, 0, -1);

if (Input.GetKey(KeyCode.K)) transform.position = camera_position;

}