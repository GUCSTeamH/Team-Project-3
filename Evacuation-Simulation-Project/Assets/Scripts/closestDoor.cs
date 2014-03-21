
using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;
using System.Collections.Generic;
public class closestDoor : MonoBehaviour {
	public Vector3 targetPosition;
	public string att;
	public GameObject[] doors;
	
	public void calculateDoor(){
		
		Debug.Log(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
		doors = GameObject.FindGameObjectsWithTag("Door");
		float minDistance = Vector3.Distance(transform.position, doors[0].transform.position);
		string doorName=doors[0].name;
		targetPosition = doors[0].transform.position;
		int i=1;
		while (i<doors.Length){
			float distance=Vector3.Distance(transform.position, doors[i].transform.position);
			if (distance < minDistance){
				doorName=doors[i].name;
				minDistance=distance;
				targetPosition=doors[i].transform.position;
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