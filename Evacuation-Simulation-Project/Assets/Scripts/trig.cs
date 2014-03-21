using UnityEngine;
using System.Collections;

public class trig : MonoBehaviour {
	public GUIScript script;
	
	void OnTriggerStay (Collider other) {
		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		script =(GUIScript) plane.GetComponent("GUIScript");
		//RAINAgent ai=GetComponent<RAINAgent>();
		//string door = ai.Agent.actionContext.GetContextItem<string>("doorName");
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