using UnityEngine;
using System.Collections;

public class DisableDoor : MonoBehaviour {
	public GUIScript script;
	public getDoors doorScript;
	public int check=0;
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
		Debug.Log("here");
		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		script =(GUIScript) plane.GetComponent("GUIScript");
		doorScript =(getDoors) plane.GetComponent("getDoors");
		GameObject door = getDoor(this.name);

		if (script.start == false && door != null){
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
			//this.renderer.material.color -= new Color(0,0,0,.50f);
		}
	}
}