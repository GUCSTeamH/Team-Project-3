using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class trigPass : MonoBehaviour {
	int i=0;



	void OnTriggerEnter (Collider other) {
		RAINAgent ai=GetComponent<RAINAgent>();
		if (other.gameObject.name=="Passenger" && i<1) {

			StartCoroutine(Wait(ai));

			Debug.Log("#####################");
			i++;
		}
	}

	IEnumerator Wait(RAINAgent ai){
		Debug.Log("#####################");
		float x= ai.maxSpeed;
		if (ai!=null){
			//print ("not null");
			Debug.Log("#####################");
			ai.maxSpeed = 0;
		}
//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(10);
		Debug.Log("!!!!!!!!!!!!!!!!!!!!");
		ai.maxSpeed=x;
	}
}
