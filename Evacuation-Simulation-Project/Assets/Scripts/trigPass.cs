using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class trigPass : MonoBehaviour {
	int i=0;
	

	void OnTriggerEnter (Collider other) {
		RAINAgent ai = GetComponent<RAINAgent>();
		RAINAgent otherAI = other.gameObject.GetComponent<RAINAgent>();

		if (other.gameObject.name=="Passenger" && otherAI != null && i < 1){
			bool otherOverFifty = otherAI.Agent.actionContext.GetContextItem<bool>("overFifty");
			bool otherGender = otherAI.Agent.actionContext.GetContextItem<bool>("gender");

			int random = Random.Range(0, 100);
			int range;
			if (otherGender && otherOverFifty){
				range = 100;
			}
			else if (!otherGender && otherOverFifty){
				range = 85;
			}
			else if (otherGender && !otherOverFifty){
				range = 70;
			}
			else{
				range = 55;
			}

			if (random < range){
				StartCoroutine(Wait(ai));
			}
			i++;

		}
	}

	IEnumerator Wait(RAINAgent ai){
		float x= ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = Random.Range(1, 5);
		if (ai!=null){
			//print ("not null");
			ai.maxSpeed = 0;
			this.gameObject.rigidbody.mass=50;
		}
//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(time);
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass=mass;
	}
}
