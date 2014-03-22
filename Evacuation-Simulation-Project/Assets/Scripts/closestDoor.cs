
using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;
using System.Collections.Generic;
public class closestDoor : MonoBehaviour {
	public Vector3 targetPosition;
	public string att;
	public getDoors doorScript;

	public List<GameObject> doorslist;
	

	public void calculateDoor(){
		

		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		doorScript =(getDoors) plane.GetComponent("getDoors");
		doorslist = doorScript.doorslist;
		Debug.Log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>"+doorslist.Count);

		float minDistance = Vector3.Distance(transform.position, doorslist[0].transform.position);
		string doorName=doorslist[0].name;
		targetPosition = doorslist[0].transform.position;
		int i=1;
		while (i<doorslist.Count){
			float distance=Vector3.Distance(transform.position, doorslist[i].transform.position);
			if (distance < minDistance){
				doorName=doorslist[i].name;
				minDistance=distance;
				targetPosition=doorslist[i].transform.position;
			}
			i++;
		}
		
		RAINAgent ai=GetComponent<RAINAgent>();
		if (ai!=null){
			//print ("not null");
			ai.Agent.actionContext.SetContextItem<Vector3>("door", targetPosition);
			ai.Agent.actionContext.SetContextItem<string>("doorName", doorName);
			string type = ai.Agent.actionContext.GetContextItem<string>("type");
			
			if (type == "altruism"){
				Debug.Log ("trigpass");
				this.gameObject.AddComponent("trigPass");
			}
			else if (type == "behaviouralinaction"){
				this.gameObject.AddComponent("BehaviouralInaction");
			}
		}
		else print ("null");
		//print(ai.Agent.actionContext.GetContextItem<string>("door"));
		
	}
}