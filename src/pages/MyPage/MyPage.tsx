function MyPage() {
  return (
    <div className="flex flex-col p-10 h-screen justify-around items-center gap-4">
      <div className="flex items-center bg-slate-400 w-5/6 rounded h-1/3 gap-10">
        <div className="ml-10 rounded-full bg-white w-28 h-28"></div>
        <div className="flex flex-col">
          <div className="text-white text-[20px] ">닉네임: 테스트</div>
          <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded">
            수정 버튼
          </button>
        </div>
      </div>
      <div className="w-5/6 h-1/3 bg-cover bg-mypage-image rounded-lg bg-position-center-85"></div>
    </div>
  );
}

export default MyPage;
