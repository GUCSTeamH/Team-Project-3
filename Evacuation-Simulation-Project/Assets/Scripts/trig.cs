/*
 * script that destroys a game object on collision and updates the counters corresponding
 * to the door that destroyed the game object
 */ 

using UnityEngine;
using System.Collections;

public class trig : MonoBehaviour {
	public GUIScript script;

	//when an object collides with a door
	void OnTriggerStay (Collider other) {
		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		script =(GUIScript) plane.GetComponent("GUIScript");
	
		//since the passengers have 2 colliders, to enable some of them to give
		//priority whenever they collide with another passenger, this script will register
		//every collision, making that 2 / passenger
		//the check below is to ensure every collision is registered once
		if (!other.isTrigger){
			if (this.gameObject.name == "DoorFL") script.updateEvacFL();
			else if (this.gameObject.name == "DoorFR") script.updateEvacFR();
			else if (this.gameObject.name == "DoorBL") script.updateEvacBL();
			else if (this.gameObject.name == "DoorBR") script.updateEvacBR();
			else if (this.gameObject.name == "DoorML1") script.updateEvacML1();
			else if (this.gameObject.name == "DoorML2") script.updateEvacML2();
			else if (this.gameObject.name == "DoorMR1") script.updateEvacMR1();
			else if (this.gameObject.name == "DoorMR2") script.updateEvacMR2();
			Destroy (other.gameObject);
		}
		
	}
	
}