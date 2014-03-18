using UnityEngine;
using System.Collections;

public class trig : MonoBehaviour {

	void OnTriggerStay (Collider other) {
		Destroy (other.gameObject);
		//StartCoroutine(Wait(other.gameObject));


	}

}