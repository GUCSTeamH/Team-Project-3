﻿using UnityEngine;
using System.Collections;

public class DisableDoor : MonoBehaviour {
	public GUIScript script;

	public void OnMouseDown(){
		GameObject plane = GameObject.FindGameObjectWithTag("plane");
		script =(GUIScript) plane.GetComponent("GUIScript");
		if (script.start == false){
			if (this.renderer.material.color == Color.red)
				this.renderer.material.color = Color.green;
			else this.renderer.material.color = Color.red;
			this.renderer.material.color -= new Color(0,0,0,.50f);


		}
	}
}