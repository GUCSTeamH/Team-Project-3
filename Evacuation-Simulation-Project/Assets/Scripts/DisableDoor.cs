 /*
 * Script that enables users to select or deselect the doors they want locked/unlocked.
 * Script attached to the Airplane object.
 * 
 */

using UnityEngine;
using System.Collections;

public class DisableDoor : MonoBehaviour {
	public GUIScript script;
	public getDoors doorScript;
	public int check=0;


	//method that finds the game object corresponding to the door that was selected
	public GameObject getDoor(string name){
		if (name == "DoorBL") return GameObject.Find("door_bl");
		else if (name == "DoorBR") return GameObject.Find("door_br");
		else if (name == "DoorFL") return GameObject.Find("door_fl");
		else if (name == "DoorFR") return GameObject.Find("door_fr");
		else if (name == "DoorML1") return GameObject.Find("door_ml1");
		else if (name == "DoorML2") return GameObject.Find("door_ml2");
		else if (name == "DoorMR1") return GameObject.Find("door_mr1");
		else if (name == "DoorMR2") return GameObject.Find("door_mr2");
		else return null;
	}


	public void OnMouseDown(){

		//access the GUI script to check that the simulation has not been started
		//and the getDoors script to access add/remove doors
		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		script =(GUIScript) plane.GetComponent("GUIScript");
		doorScript =(getDoors) plane.GetComponent("getDoors");
		GameObject door = getDoor(this.name);

		//if the animation has not been started yet and the user has clicked on a door
		//either add or remove door from list of doors
		//change colour to let user know the door has been blocked
		//the check to see if there is at least one door open at all times is done in 
		//getDoors script, so no need to check again here
		if (script.start == false && door != null)
			if (check == 1){
				check=0;
				this.renderer.material.color = Color.green;
				this.renderer.material.color -= new Color(0,0,0,.50f);
				doorScript.addDoor(door);
			}
			else {
				if (doorScript.removeDoor(door)){
				check=1;
				this.renderer.material.color = Color.red;
				this.renderer.material.color -= new Color(0,0,0,.50f);
				}
			}

	}
}