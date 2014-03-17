using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;
public class closestDoor : MonoBehaviour {
	public Vector3 targetPosition;
	public string att;
	// Use this for initialization
	void Start () {

		GameObject[] doors = GameObject.FindGameObjectsWithTag("Door");
		float minDistance = Vector3.Distance(transform.position, doors[0].transform.position);
		string doorName=doors[0].name;
		GameObject door=doors[0];
		int i=1;
		while (i<doors.Length){
			float distance=Vector3.Distance(transform.position, doors[i].transform.position);
			if (distance < minDistance){
				doorName=doors[i].name;
				minDistance=distance;
				door=doors[i];
			}
			i++;
		}

		RAINAgent ai=GetComponent<RAINAgent>();
		if (ai!=null){
			//print ("not null");
			ai.Agent.actionContext.SetContextItem<string>("door", doorName);
			string type = ai.Agent.actionContext.GetContextItem<string>("type");

			if (type == "altruism"){
				Debug.Log ("trigpass");
				this.gameObject.AddComponent("trigPass");
			}
		}
		else print ("null");
		targetPosition=door.transform.position;
		//print(ai.Agent.actionContext.GetContextItem<string>("door"));
		
	}
	

}
