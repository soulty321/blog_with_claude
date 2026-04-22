import os
import json
from typing import List, Optional

class FileManager:
    """
    마크다운 원본 파일을 관리하고 읽기 상태를 추적하는 클래스.
    """
    def __init__(self, base_dir: str, state_file: str):
        self.base_dir = base_dir
        self.state_file = state_file
        self.state = self._load_state()

    def _load_state(self) -> dict:
        if os.path.exists(self.state_file):
            with open(self.state_file, 'r', encoding='utf-8') as f:
                return json.load(f)
        return {"processed_files": []}

    def _save_state(self):
        os.makedirs(os.path.dirname(self.state_file), exist_ok=True)
        with open(self.state_file, 'w', encoding='utf-8') as f:
            json.dump(self.state, f, ensure_ascii=False, indent=2)

    def get_next_file(self) -> Optional[str]:
        """
        아직 처리되지 않은 다음 마크다운 파일 경로를 반환.
        """
        source_dir = os.path.join(self.base_dir, "일본 컨퍼런스 자료")
        if not os.path.exists(source_dir):
            return None

        all_files = [f for f in os.listdir(source_dir) if f.endswith('.md')]
        all_files.sort() # 일관된 순서를 위해 정렬

        for file_name in all_files:
            if file_name not in self.state["processed_files"]:
                return os.path.join(source_dir, file_name)
        
        return None

    def read_content(self, file_path: str) -> str:
        with open(file_path, 'r', encoding='utf-8') as f:
            return f.read()

    def mark_as_processed(self, file_path: str):
        file_name = os.path.basename(file_path)
        if file_name not in self.state["processed_files"]:
            self.state["processed_files"].append(file_name)
            self._save_state()
