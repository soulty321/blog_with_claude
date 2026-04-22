import os
from dotenv import load_dotenv
from file_manager import FileManager
from ai_generator import AIGenerator
from discord_webhook import DiscordWebhook

def main():
    # 환경 변수 로드 (.env 파일이 있으면 로드, 없으면 시스템 환경변수 사용)
    load_dotenv()
    
    # 설정값 가져오기
    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    DISCORD_WEBHOOK_URL = os.getenv("BLOG_DISCORD_WEBHOOK_URL")
    
    if not GEMINI_API_KEY or not DISCORD_WEBHOOK_URL:
        print("에러: GEMINI_API_KEY 또는 BLOG_DISCORD_WEBHOOK_URL이 설정되지 않았습니다.")
        return

    # 경로 설정
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    STATE_FILE = os.path.join(BASE_DIR, "data", "process_state.json")

    # 객체 초기화
    file_mgr = FileManager(BASE_DIR, STATE_FILE)
    generator = AIGenerator(GEMINI_API_KEY)
    notifier = DiscordWebhook(DISCORD_WEBHOOK_URL)

    # 1. 처리할 다음 파일 가져오기
    next_file = file_mgr.get_next_file()
    if not next_file:
        print("알림: 처리할 새로운 마크다운 파일이 없습니다.")
        return

    print(f"작업 시작: {next_file}")

    # 2. 내용 읽기
    source_content = file_mgr.read_content(next_file)

    # 3. AI 초안 생성
    draft = generator.generate_draft(source_content)
    if not draft:
        print("에러: AI 초안 생성에 실패했습니다.")
        return

    # 4. Discord 전송
    message = f"🚀 **오늘의 블로그 초안이 도착했습니다!**\n\n원본 파일: `{os.path.basename(next_file)}`\n\n---\n\n{draft}"
    notifier.send_message(message)

    # 5. 처리 완료 마킹
    file_mgr.mark_as_processed(next_file)
    print(f"작업 완료: {next_file}")

if __name__ == "__main__":
    main()
