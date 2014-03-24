#pragma strict

function Start () {

}
var mDirection:Vector3;
var controller : CharacterController;
 
function Update() 
{
    //Direction.z-=2*Time.deltaTime;
    mDirection.y+=3*Time.deltaTime;
    mDirection.x-=5*Time.deltaTime;
    controller.Move(mDirection * Time.deltaTime);
}