
document.addEventListener('DOMContentLoaded', function() {
    const drawButton = document.getElementById('drawButton');
    const resetButton = document.getElementById('resetButton');
    const resultContainer = document.getElementById('result');
    const selectedNumbers = document.getElementById('selectedNumbers');
    
    drawButton.addEventListener('click', drawCleaningDuty);
    resetButton.addEventListener('click', resetSelection);
    
    function drawCleaningDuty() {
        // SweetAlert2 로딩 표시
        Swal.fire({
            title: '청소당번 추첨 중...',
            html: '<div class="spinner-border text-primary" role="status"><span class="visually-hidden">Loading...</span></div>',
            showConfirmButton: false,
            allowOutsideClick: false,
            timer: 2000,
            background: '#fff',
            customClass: {
                popup: 'rounded-3 shadow-lg'
            }
        });
        
        setTimeout(() => {
            // 1부터 25까지의 번호 배열 생성
            const numbers = Array.from({length: 25}, (_, i) => i + 1);
            
            // Fisher-Yates 셔플 알고리즘으로 배열 섞기
            for (let i = numbers.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
            }
            
            // 처음 5개 번호 선택
            const selected = numbers.slice(0, 5).sort((a, b) => a - b);
            
            // SweetAlert2로 결과 발표
            Swal.fire({
                title: '🎉 추첨 완료!',
                html: `
                    <div class="mb-3">
                        <h5 class="text-primary">선택된 청소당번</h5>
                        <div class="d-flex justify-content-center gap-2 flex-wrap mt-3">
                            ${selected.map(num => `
                                <span class="badge bg-gradient bg-primary rounded-circle p-3" style="width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; font-size: 1.2rem;">
                                    ${num}
                                </span>
                            `).join('')}
                        </div>
                    </div>
                    <p class="text-muted">수고하세요! 💪</p>
                `,
                icon: 'success',
                confirmButtonText: '확인',
                confirmButtonColor: '#28a745',
                background: '#fff',
                customClass: {
                    popup: 'rounded-3 shadow-lg'
                }
            }).then(() => {
                displayResults(selected);
            });
        }, 2000);
    }
    
    function displayResults(numbers) {
        // 기존 결과 지우기
        selectedNumbers.innerHTML = '';
        
        // 각 번호를 카드로 표시
        numbers.forEach((number, index) => {
            setTimeout(() => {
                const numberCard = document.createElement('div');
                numberCard.className = 'number-card';
                numberCard.textContent = number;
                
                // 호버 효과를 위한 tooltip 추가
                numberCard.setAttribute('data-bs-toggle', 'tooltip');
                numberCard.setAttribute('title', `${number}번 당첨!`);
                
                selectedNumbers.appendChild(numberCard);
                
                // Bootstrap tooltip 초기화
                new bootstrap.Tooltip(numberCard);
            }, index * 300);
        });
        
        // 결과 컨테이너 표시
        setTimeout(() => {
            resultContainer.classList.remove('hidden');
            resultContainer.classList.add('show');
        }, 300);
        
        // 버튼 상태 변경
        drawButton.style.display = 'none';
    }
    
    function resetSelection() {
        // SweetAlert2 확인 다이얼로그
        Swal.fire({
            title: '다시 뽑으시겠습니까?',
            text: "현재 결과가 초기화됩니다.",
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: '네, 다시 뽑기',
            cancelButtonText: '취소',
            background: '#fff',
            customClass: {
                popup: 'rounded-3 shadow-lg'
            }
        }).then((result) => {
            if (result.isConfirmed) {
                // 성공 메시지
                Swal.fire({
                    title: '초기화 완료!',
                    text: '새로운 추첨을 시작하세요.',
                    icon: 'success',
                    timer: 1500,
                    showConfirmButton: false,
                    background: '#fff',
                    customClass: {
                        popup: 'rounded-3 shadow-lg'
                    }
                });
                
                // 결과 숨기기
                resultContainer.classList.remove('show');
                resultContainer.classList.add('hidden');
                
                // 버튼 상태 복원
                drawButton.style.display = 'inline-block';
                
                // 결과 내용 지우기
                setTimeout(() => {
                    selectedNumbers.innerHTML = '';
                }, 300);
            }
        });
    }
    
    // 초기 환영 메시지
    setTimeout(() => {
        Swal.fire({
            title: '청소당번 뽑기에 오신 것을 환영합니다! 🧹',
            text: '공정한 추첨으로 청소당번을 정해보세요!',
            icon: 'info',
            timer: 3000,
            showConfirmButton: false,
            background: '#fff',
            customClass: {
                popup: 'rounded-3 shadow-lg'
            }
        });
    }, 1000);
});
