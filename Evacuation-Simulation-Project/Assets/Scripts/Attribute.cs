using UnityEngine;
using System.Collections;
using RAIN.Core;
using RAIN.Action;

public class Attribute : MonoBehaviour {

	public int monteCarlo(int min, int max){
		return (Random.Range(min, max));
	}
	
	/* Types - Altruism, Behavioural-Inaction, Panic, Fear-Flight */ 
	public void setType(){
		RAINAgent ai = GetComponent<RAINAgent>();
		if (ai!=null){
			int random = monteCarlo(0, 100);
			
			if (random < 10){
				ai.Agent.actionContext.SetContextItem<string>("type", "altruism");
				/*ai.Agent.Avatar.renderer.material.color = Color.yellow; */
				Debug.Log("Altruism");
			}
			else if (random < 50){
				ai.Agent.actionContext.SetContextItem<string>("type", "behaviouralinaction");
			}
			else if (random < 75){
				ai.Agent.actionContext.SetContextItem<string>("type", "fearflight");
			}
			else{
				ai.Agent.actionContext.SetContextItem<string>("type", "panic");
				/* ai.Agent.Avatar.renderer.material.color = Color.red; */
			}
		}
	}

	// Use this for initialization
	void Start () {
		setType();
	}
	
	// Update is called once per frame
	void Update () {
	
	}
}
