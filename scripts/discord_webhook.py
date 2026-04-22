import requests
import json
from typing import List

class DiscordWebhook:
    """
    Discord Webhook을 통해 메시지를 전송하는 클래스.
    """
    def __init__(self, webhook_url: str):
        self.webhook_url = webhook_url

    def send_message(self, content: str):
        """
        메시지를 전송함. 메시지가 너무 길 경우 2000자 단위로 쪼개서 전송.
        """
        if not content:
            return

        # Discord 메시지 제한: 2000자
        chunks = [content[i:i+1900] for i in range(0, len(content), 1900)]
        
        for i, chunk in enumerate(chunks):
            header = ""
            if len(chunks) > 1:
                header = f"({i+1}/{len(chunks)})\n"
            
            payload = {
                "content": header + chunk
            }
            
            response = requests.post(
                self.webhook_url,
                data=json.dumps(payload),
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code not in [200, 204]:
                print(f"Discord 전송 실패: {response.status_code}, {response.text}")
