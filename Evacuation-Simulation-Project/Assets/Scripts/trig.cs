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
			Destroy (other.gameObject);
			script.updateEvac();
		}
		//StartCoroutine(Wait(other.gameObject));
		
		
	}

}