using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class RandomTeleport : MonoBehaviour
{
    float startTime = 0.0f;
    float teleportDelay = 2.0f; //seconds
    // Start is called before the first frame update
    void Start()
    {
        startTime = Time.time;
    }

    // Update is called once per frame
    void Update()
    {
        if (Time.time >= startTime + teleportDelay + 0.0001f)
        {
            transform.position = new Vector3(Random.Range(0, 5), Random.Range(0, 5));
            startTime += teleportDelay;
        }
    }
}
