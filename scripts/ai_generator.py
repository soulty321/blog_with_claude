import os
import google.generativeai as genai
from typing import Optional

class AIGenerator:
    """
    LLM을 사용하여 원본 텍스트를 블로그 포스팅 초안으로 변환하는 클래스.
    """
    def __init__(self, api_key: str, model_name: str = "gemini-1.5-flash"):
        genai.configure(api_key=api_key)
        self.model = genai.GenerativeModel(model_name)

    def generate_draft(self, source_text: str) -> Optional[str]:
        prompt = f"""
다음은 컨퍼런스 자료 또는 개인적인 노트의 내용입니다. 
이 내용을 바탕으로 블로그에 올리기 좋은 가독성 높은 포스팅 초안을 작성해 주세요.

[작성 가이드]
1. 독자가 흥미를 느낄 수 있는 매력적인 제목을 포함해 주세요.
2. 서론, 본문(소제목 포함), 결론의 구조로 작성해 주세요.
3. 원문의 핵심 인사이트를 잘 보존하면서도 문체는 친절하고 전문적인 '블로그 말투'로 작성해 주세요.
4. 마크다운 형식을 사용해 주세요.

[원본 내용]
{source_text}
"""
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            print(f"AI 생성 중 오류 발생: {e}")
            return None
