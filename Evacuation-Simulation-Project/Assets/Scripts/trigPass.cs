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
		float mass = this.gameObject.rigidbody.mass;
		if (ai!=null){
			//print ("not null");
			Debug.Log("#####################");
			ai.maxSpeed = 0;
			this.gameObject.rigidbody.mass=50;
		}
//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(10);
		Debug.Log("!!!!!!!!!!!!!!!!!!!!");
		ai.maxSpeed=x;
		this.gameObject.rigidbody.mass=mass;
	}
}
