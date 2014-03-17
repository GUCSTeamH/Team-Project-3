using UnityEngine;
using System.Collections;

public class trig : MonoBehaviour {

	void OnTriggerEnter (Collider other) {
		
		Destroy (other.gameObject);

	}
}