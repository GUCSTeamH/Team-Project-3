using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class BehaviouralInaction : MonoBehaviour {

	RAINAgent ai;

	void Start(){
		ai = GetComponent<RAINAgent>();
		Debug.Log(ai);
		StartCoroutine(Wait(ai));
	}

	IEnumerator Wait(RAINAgent ai){
		float x = ai.maxSpeed;
		float mass = this.gameObject.rigidbody.mass;
		int time = Random.Range(5, 20);
		if (ai!=null){
			//print ("not null");
			ai.maxSpeed = 0;
			this.gameObject.rigidbody.mass=30;
		}
		//		yield WaitForSeconds(30);
		yield return new WaitForSeconds(time);
		Debug.Log("!!!!!!!!!!!!!!!!!!!!");
		ai.maxSpeed = x;
		this.gameObject.rigidbody.mass = mass;
	}
}
