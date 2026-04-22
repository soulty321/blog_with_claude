# Blog Automation Scripts

이 디렉토리는 마크다운 노트를 기반으로 블로그 초안을 자동 생성하고 Discord로 전송하는 시스템을 포함하고 있습니다.

## 구조 (Architecture)
- `main.py`: 오케스트레이터. 전체 실행 흐름을 관리합니다.
- `file_manager.py`: `일본 컨퍼런스 자료` 폴더 내의 파일을 순차적으로 읽고, `data/process_state.json`을 통해 중복 처리를 방지합니다.
- `ai_generator.py`: Google Gemini API를 사용하여 원본 텍스트를 블로그 포스팅 형식으로 변환합니다.
- `discord_webhook.py`: 생성된 결과물을 Discord 웹훅으로 전송합니다. 2000자 제한을 고려하여 자동 분할 전송 기능을 포함합니다.

## 클로드(Claude)를 위한 가이드
이 코드는 향후 클로드가 유지보수하거나 확장하기 쉽도록 다음과 같은 원칙을 따릅니다:
1. **모듈화**: 각 기능이 독립된 파일로 분리되어 있어 특정 로직(예: AI 프롬프트)만 수정하기 쉽습니다.
2. **타입 힌트**: 파이썬의 `typing` 모듈을 사용하여 데이터 흐름을 명확히 했습니다.
3. **무상태성/멱등성**: `process_state.json`을 사용하여 실행 시마다 다음 파일을 안정적으로 찾아 처리합니다.

## 확장 방법
- **다른 LLM 사용**: `ai_generator.py`에서 `GenerativeModel` 호출 부분만 수정하거나 클래스를 상속받아 구현하면 됩니다.
- **파일 선택 로직 변경**: `file_manager.py`의 `get_next_file` 메서드를 수정하여 특정 키워드가 포함된 파일만 고르거나 랜덤하게 고르도록 할 수 있습니다.

## 환경 변수
`.env` 파일 또는 시스템 환경변수에 다음 값이 필요합니다:
- `GEMINI_API_KEY`: Google AI Studio에서 발급받은 키.
- `BLOG_DISCORD_WEBHOOK_URL`: 초안을 받을 Discord 채널의 웹훅 URL.
