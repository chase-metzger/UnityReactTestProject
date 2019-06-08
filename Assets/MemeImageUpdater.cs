using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using UnityEngine.Networking;

public class MemeImageUpdater : MonoBehaviour
{
    IEnumerator UpdateImage(string imageURL)
    {
        UnityWebRequest www = UnityWebRequestTexture.GetTexture(imageURL);
        yield return www.SendWebRequest();
        if (www.isNetworkError || www.isHttpError)
        {
            Debug.Log(www.error);
        }
        else
        {
            //hexMaterial.mainTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            Texture2D resultTexture = ((DownloadHandlerTexture)www.downloadHandler).texture;
            SpriteRenderer spr = GameObject.Find("Meme").GetComponent<SpriteRenderer>();
            spr.sprite = Sprite.Create(resultTexture, new Rect(0, 0, resultTexture.width, resultTexture.height), new Vector2(0.5f, 0.5f), 100.0f, 0, SpriteMeshType.FullRect, spr.sprite.border, false);
            //            spr.material = new Material(Shader.Find("Sprites/Default"));
            spr.material.shader = Shader.Find("Sprites/Default");
            spr.material.color = Color.white;
            spr.material.mainTexture = resultTexture;
        }
    }

    public void SetMemeImage(string imageURL)
    {
        StartCoroutine(UpdateImage(imageURL));
    }
}
