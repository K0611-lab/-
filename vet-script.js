// 標籤切換功能
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        const tabName = this.getAttribute('data-tab');
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        this.classList.add('active');
        document.getElementById(tabName).classList.add('active');
    });
});

// 常用獸藥資料庫
const drugDatabase = {
    'amoxicillin': {
        name: '阿莫西林',
        type: '抗生素',
        dosage: {
            'dog': { dose: '10-20', unit: 'mg/kg', frequency: '8小時一次', route: '口服' },
            'cat': { dose: '10-20', unit: 'mg/kg', frequency: '8小時一次', route: '口服' },
            'rabbit': { dose: '10-30', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '100-150', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'reptile': { dose: '20-40', unit: 'mg/kg', frequency: '24小時一次', route: '肌注' }
        },
        warning: '可能引起過敏反應，長期使用需監測肝臟功能'
    },
    'penicillin': {
        name: '青黴素',
        type: '抗生素',
        dosage: {
            'dog': { dose: '10000-20000', unit: 'IU/kg', frequency: '6-8小時一次', route: '肌注/靜脈' },
            'cat': { dose: '10000-20000', unit: 'IU/kg', frequency: '6-8小時一次', route: '肌注' },
            'rabbit': { dose: '10000-20000', unit: 'IU/kg', frequency: '12小時一次', route: '肌注' },
            'bird': { dose: '20000-50000', unit: 'IU/kg', frequency: '12小時一次', route: '肌注' },
            'reptile': { dose: '10000', unit: 'IU/kg', frequency: '24小時一次', route: '肌注' }
        },
        warning: '監測過敏反應，貓對高劑量敏感'
    },
    'doxycycline': {
        name: '強力黴素',
        type: '抗生素',
        dosage: {
            'dog': { dose: '5-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'cat': { dose: '5-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'rabbit': { dose: '5-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '20-40', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'reptile': { dose: '10-20', unit: 'mg/kg', frequency: '24小時一次', route: '口服' }
        },
        warning: '可導致食管損傷，口服時需充分飲水。孕期動物禁用'
    },
    'enrofloxacin': {
        name: '恩諾沙星(Baytril)',
        type: '喹諾酮類抗生素',
        dosage: {
            'dog': { dose: '5-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服/注射' },
            'cat': { dose: '2.5-5', unit: 'mg/kg', frequency: '24小時一次', route: '口服/注射' },
            'rabbit': { dose: '10-20', unit: 'mg/kg', frequency: '12小時一次', route: '注射' },
            'bird': { dose: '10', unit: 'mg/kg', frequency: '24小時一次', route: '口服/注射' },
            'reptile': { dose: '5-10', unit: 'mg/kg', frequency: '24-48小時一次', route: '注射' }
        },
        warning: '貓對高劑量敏感可導致視力受損。避免在年幼動物上使用'
    },
    'gentamicin': {
        name: '慶大黴素',
        type: '氨基糖苷類抗生素',
        dosage: {
            'dog': { dose: '5-7', unit: 'mg/kg', frequency: '24小時一次', route: '肌注/靜脈' },
            'cat': { dose: '5-7', unit: 'mg/kg', frequency: '24小時一次', route: '肌注/靜脈' },
            'rabbit': { dose: '5-8', unit: 'mg/kg', frequency: '24小時一次', route: '肌注' },
            'bird': { dose: '10', unit: 'mg/kg', frequency: '24小時一次', route: '肌注' },
            'reptile': { dose: '4-5', unit: 'mg/kg', frequency: '48小時一次', route: '肌注' }
        },
        warning: '易引起耳毒性和腎毒性。監測腎功能，盡量短期使用'
    },
    'fluconazole': {
        name: '氟康唑',
        type: '抗真菌劑',
        dosage: {
            'dog': { dose: '2.2-4.4', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'cat': { dose: '2.2-4.4', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'rabbit': { dose: '10-20', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '10-20', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'reptile': { dose: '10', unit: 'mg/kg', frequency: '24小時一次', route: '口服' }
        },
        warning: '長期治療需監測肝功能。對某些真菌效果有限'
    },
    'ibuprofen': {
        name: '布洛芬',
        type: '非類固醇消炎藥',
        dosage: {
            'dog': { dose: '4-10', unit: 'mg/kg', frequency: '8-12小時一次', route: '口服' },
            'cat': { dose: '4-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'rabbit': { dose: '5-10', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '不推薦', unit: '-', frequency: '-', route: '-' },
            'reptile': { dose: '5-10', unit: 'mg/kg', frequency: '24小時一次', route: '口服' }
        },
        warning: '⚠️ 貓極其敏感！長期使用可導致胃腸道和腎臟損傷。不推薦用於鳥類'
    },
    'meloxicam': {
        name: '美洛昔康(Metacam)',
        type: '非類固醇消炎藥',
        dosage: {
            'dog': { dose: '0.1-0.2', unit: 'mg/kg', frequency: '24小時一次', route: '口服/注射' },
            'cat': { dose: '0.1-0.3', unit: 'mg/kg', frequency: '24小時一次', route: '口服/注射' },
            'rabbit': { dose: '0.5-1', unit: 'mg/kg', frequency: '24小時一次', route: '口服' },
            'bird': { dose: '1-2', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'reptile': { dose: '0.2-1', unit: 'mg/kg', frequency: '24-48小時一次', route: '口服/注射' }
        },
        warning: '比布洛芬更安全。仍需監測，特別是長期使用'
    },
    'dexamethasone': {
        name: '地塞米松',
        type: '糖皮質激素',
        dosage: {
            'dog': { dose: '0.1-0.5', unit: 'mg/kg', frequency: '12-24小時一次', route: '肌注/靜脈/口服' },
            'cat': { dose: '0.1-0.5', unit: 'mg/kg', frequency: '12-24小時一次', route: '肌注/靜脈' },
            'rabbit': { dose: '0.5-2', unit: 'mg/kg', frequency: '24小時一次', route: '肌注/口服' },
            'bird': { dose: '0.5-2', unit: 'mg/kg', frequency: '24小時一次', route: '肌注' },
            'reptile': { dose: '0.5-1', unit: 'mg/kg', frequency: '24-48小時一次', route: '肌注' }
        },
        warning: '長期使用可導致免疫抑制和糖尿病。避免突然停用'
    },
    'prednisone': {
        name: '潑尼松',
        type: '糖皮質激素',
        dosage: {
            'dog': { dose: '0.5-2.2', unit: 'mg/kg', frequency: '24小時一次或分次', route: '口服' },
            'cat': { dose: '0.5-2.2', unit: 'mg/kg', frequency: '24小時一次或分次', route: '口服' },
            'rabbit': { dose: '1-5', unit: 'mg/kg', frequency: '24小時一次', route: '口服' },
            'bird': { dose: '1-5', unit: 'mg/kg', frequency: '12-24小時一次', route: '口服' },
            'reptile': { dose: '1-2', unit: 'mg/kg', frequency: '24-48小時一次', route: '口服' }
        },
        warning: '長期治療需逐漸減量。監測血糖和感染風險'
    },
    'omeprazole': {
        name: '奧美拉唑',
        type: '質子泵抑制劑',
        dosage: {
            'dog': { dose: '0.5-1', unit: 'mg/kg', frequency: '12-24小時一次', route: '口服' },
            'cat': { dose: '0.5-1', unit: 'mg/kg', frequency: '12-24小時一次', route: '口服' },
            'rabbit': { dose: '1-2', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '1-3', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'reptile': { dose: '0.5-1', unit: 'mg/kg', frequency: '24-48小時一次', route: '口服' }
        },
        warning: '口服時不應分散或咀嚼。長期使用可影響維生素B12吸收'
    },
    'metronidazole': {
        name: '甲硝唑',
        type: '抗原蟲/抗菌藥',
        dosage: {
            'dog': { dose: '10-25', unit: 'mg/kg', frequency: '8-12小時一次', route: '口服/靜脈' },
            'cat': { dose: '10-25', unit: 'mg/kg', frequency: '8-12小時一次', route: '口服' },
            'rabbit': { dose: '20-40', unit: 'mg/kg', frequency: '12小時一次', route: '口服' },
            'bird': { dose: '50', unit: 'mg/kg', frequency: '24小時一次', route: '口服' },
            'reptile': { dose: '20-40', unit: 'mg/kg', frequency: '24小時一次', route: '口服' }
        },
        warning: '可能引起神經毒性。監測步態改變，避免長期高劑量使用'
    }
};

// 載入藥物信息
function loadDrugInfo() {
    const drugSelect = document.getElementById('select-drug').value;
    const drugInfoDiv = document.getElementById('drug-info');
    
    if (!drugSelect) {
        drugInfoDiv.classList.remove('show');
        return;
    }
    
    const drug = drugDatabase[drugSelect];
    const animalType = document.getElementById('animal-type').value;
    const dosageInfo = drug.dosage[animalType];
    
    let html = `
        <h3>${drug.name}</h3>
        <div class="drug-detail">
            <div class="detail-item">
                <div class="detail-label">藥物類別</div>
                <div class="detail-value">${drug.type}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">推薦劑量</div>
                <div class="detail-value">${dosageInfo.dose} ${dosageInfo.unit}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">給藥頻率</div>
                <div class="detail-value">${dosageInfo.frequency}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">給藥途徑</div>
                <div class="detail-value">${dosageInfo.route}</div>
            </div>
        </div>
    `;
    
    if (drug.warning) {
        html += `<div style="background: #fff3cd; color: #856404; padding: 10px; border-radius: 6px; margin-top: 10px;">⚠️ ${drug.warning}</div>`;
    }
    
    drugInfoDiv.innerHTML = html;
    drugInfoDiv.classList.add('show');
}

// 基本劑量計算
function calculateBasic() {
    const concentration = parseFloat(document.getElementById('concentration').value);
    const doseNeeded = parseFloat(document.getElementById('dose-needed').value);
    const drugName = document.getElementById('drug-name').value || '該藥物';
    
    const resultDiv = document.getElementById('basic-result');
    
    if (!concentration || !doseNeeded) {
        showError(resultDiv, '請輸入藥物濃度和所需劑量');
        return;
    }
    
    const volumeNeeded = doseNeeded / concentration;
    
    let html = `
        <div class="result-item">
            <span class="result-label">藥物</span>
            <span class="result-value">${drugName}</span>
        </div>
        <div class="result-item">
            <span class="result-label">濃度</span>
            <span class="result-value">${concentration} ${document.getElementById('concentration-unit').value}</span>
        </div>
        <div class="result-item">
            <span class="result-label">所需劑量</span>
            <span class="result-value">${doseNeeded} ${document.getElementById('dose-unit').value}</span>
        </div>
        <div class="result-section success-text">
            <h3>計算結果</h3>
            <div class="result-item">
                <span class="result-label">需要用量</span>
                <span class="result-value">${volumeNeeded.toFixed(3)} ml</span>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// 體重比例計算
function calculateWeightBased() {
    const weight = parseFloat(document.getElementById('animal-weight').value);
    const dosePerKg = parseFloat(document.getElementById('dose-per-kg').value);
    const frequency = parseInt(document.getElementById('frequency').value);
    const treatmentDays = parseInt(document.getElementById('treatment-days').value);
    
    const resultDiv = document.getElementById('weight-result');
    
    if (!weight || !dosePerKg) {
        showError(resultDiv, '請輸入動物體重和每公斤劑量');
        return;
    }
    
    const singleDose = weight * dosePerKg;
    const dailyDose = singleDose * frequency;
    const totalDose = dailyDose * treatmentDays;
    
    let html = `
        <div class="result-item">
            <span class="result-label">動物體重</span>
            <span class="result-value">${weight} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">每公斤劑量</span>
            <span class="result-value">${dosePerKg} ${document.getElementById('dose-per-kg-unit').value}</span>
        </div>
        <div class="result-item">
            <span class="result-label">給藥頻率</span>
            <span class="result-value">${frequency} 次/天</span>
        </div>
        <div class="result-item">
            <span class="result-label">治療天數</span>
            <span class="result-value">${treatmentDays} 天</span>
        </div>
        <div class="result-section">
            <h3>計算結果</h3>
            <div class="result-item">
                <span class="result-label">單次劑量</span>
                <span class="result-value">${singleDose.toFixed(2)} mg</span>
            </div>
            <div class="result-item">
                <span class="result-label">每日劑量</span>
                <span class="result-value">${dailyDose.toFixed(2)} mg</span>
            </div>
            <div class="result-item success-text">
                <span class="result-label">總療程劑量</span>
                <span class="result-value">${totalDose.toFixed(2)} mg</span>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// BSA 計算
function calculateBSA() {
    const height = parseFloat(document.getElementById('height').value);
    const weight = parseFloat(document.getElementById('weight').value);
    const dosePerBSA = parseFloat(document.getElementById('dose-per-bsa').value);
    
    const resultDiv = document.getElementById('bsa-result');
    
    if (!height || !weight || !dosePerBSA) {
        showError(resultDiv, '請輸入身長、體重和單位劑量');
        return;
    }
    
    const bsa = Math.sqrt((height * weight) / 3600);
    const totalDose = bsa * dosePerBSA;
    
    let html = `
        <div class="result-item">
            <span class="result-label">身長</span>
            <span class="result-value">${height} cm</span>
        </div>
        <div class="result-item">
            <span class="result-label">體重</span>
            <span class="result-value">${weight} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">單位劑量</span>
            <span class="result-value">${dosePerBSA} mg/m²</span>
        </div>
        <div class="result-section">
            <h3>計算結果</h3>
            <div class="result-item">
                <span class="result-label">體表面積 (BSA)</span>
                <span class="result-value">${bsa.toFixed(3)} m²</span>
            </div>
            <div class="result-item success-text">
                <span class="result-label">調整劑量</span>
                <span class="result-value">${totalDose.toFixed(2)} mg</span>
            </div>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// 計算常用藥劑量
function calculateDrugDose() {
    const drugSelect = document.getElementById('select-drug').value;
    const animalType = document.getElementById('animal-type').value;
    const weight = parseFloat(document.getElementById('animal-weight-drug').value);
    
    const resultDiv = document.getElementById('drug-result');
    
    if (!drugSelect || !weight) {
        showError(resultDiv, '請選擇藥物並輸入動物體重');
        return;
    }
    
    const drug = drugDatabase[drugSelect];
    const dosageInfo = drug.dosage[animalType];
    
    const doseParts = dosageInfo.dose.split('-');
    const minDose = parseFloat(doseParts[0]);
    const maxDose = doseParts[1] ? parseFloat(doseParts[1]) : minDose;
    
    const minTotal = minDose * weight;
    const maxTotal = maxDose * weight;
    
    let html = `
        <div class="result-item">
            <span class="result-label">藥物</span>
            <span class="result-value">${drug.name}</span>
        </div>
        <div class="result-item">
            <span class="result-label">動物類型</span>
            <span class="result-value">${animalType === 'dog' ? '犬' : animalType === 'cat' ? '貓' : '其他'}</span>
        </div>
        <div class="result-item">
            <span class="result-label">體重</span>
            <span class="result-value">${weight} kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">推薦劑量</span>
            <span class="result-value">${dosageInfo.dose} ${dosageInfo.unit}</span>
        </div>
        <div class="result-section success-text">
            <h3>單次劑量計算</h3>
            <div class="result-item">
                <span class="result-label">最小劑量</span>
                <span class="result-value">${minTotal.toFixed(2)} ${dosageInfo.unit.split('/')[0]}</span>
            </div>
            <div class="result-item">
                <span class="result-label">最大劑量</span>
                <span class="result-value">${maxTotal.toFixed(2)} ${dosageInfo.unit.split('/')[0]}</span>
            </div>
        </div>
        <div class="result-item">
            <span class="result-label">給藥頻率</span>
            <span class="result-value">${dosageInfo.frequency}</span>
        </div>
        <div class="result-item">
            <span class="result-label">給藥途徑</span>
            <span class="result-value">${dosageInfo.route}</span>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// 物種代謝調整
function calculateSpeciesAdjust() {
    const baseDose = parseFloat(document.getElementById('base-dose').value);
    const targetSpecies = document.getElementById('target-species').value;
    
    const resultDiv = document.getElementById('species-result');
    
    if (!baseDose) {
        showError(resultDiv, '請輸入基礎劑量');
        return;
    }
    
    const speciesFactors = {
        'dog': 1.0,
        'cat': 0.8,
        'rabbit': 0.7,
        'hamster': 1.5,
        'guinea-pig': 0.8,
        'bird': 2.0,
        'reptile': 0.5,
        'horse': 0.6,
        'cattle': 0.5
    };
    
    const speciesNames = {
        'dog': '犬',
        'cat': '貓',
        'rabbit': '兔',
        'hamster': '倉鼠',
        'guinea-pig': '天竺鼠',
        'bird': '鳥',
        'reptile': '爬蟲',
        'horse': '馬',
        'cattle': '牛'
    };
    
    const factor = speciesFactors[targetSpecies];
    const adjustedDose = baseDose * factor;
    
    let html = `
        <div class="result-item">
            <span class="result-label">參考物種劑量 (犬)</span>
            <span class="result-value">${baseDose} mg/kg</span>
        </div>
        <div class="result-item">
            <span class="result-label">目標物種</span>
            <span class="result-value">${speciesNames[targetSpecies]}</span>
        </div>
        <div class="result-item">
            <span class="result-label">代謝調整係數</span>
            <span class="result-value">${factor.toFixed(1)}x</span>
        </div>
        <div class="result-section success-text">
            <h3>調整後劑量</h3>
            <div class="result-item">
                <span class="result-label">推薦劑量</span>
                <span class="result-value">${adjustedDose.toFixed(2)} mg/kg</span>
            </div>
        </div>
        <div class="result-item warning-text">
            <span style="display: block; margin-bottom: 8px;">⚠️ 提示</span>
            <span>物種之間的藥物代謝差異很大，此為參考值。請根據個體情況和臨床經驗調整</span>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// 稀釋計算
function calculateDilution() {
    const originalConc = parseFloat(document.getElementById('original-conc').value);
    const desiredConc = parseFloat(document.getElementById('desired-conc').value);
    const originalVolume = parseFloat(document.getElementById('original-volume').value);
    
    const resultDiv = document.getElementById('dilution-result');
    
    if (!originalConc || !desiredConc || !originalVolume) {
        showError(resultDiv, '請輸入原始濃度、所需濃度和原始用量');
        return;
    }
    
    if (originalConc <= desiredConc) {
        showError(resultDiv, '原始濃度必須高於所需濃度');
        return;
    }
    
    const finalVolume = (originalConc * originalVolume) / desiredConc;
    const solventNeeded = finalVolume - originalVolume;
    
    let html = `
        <div class="result-item">
            <span class="result-label">原始濃度</span>
            <span class="result-value">${originalConc}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">所需濃度</span>
            <span class="result-value">${desiredConc}%</span>
        </div>
        <div class="result-item">
            <span class="result-label">原始用量</span>
            <span class="result-value">${originalVolume} ${document.getElementById('volume-unit').value}</span>
        </div>
        <div class="result-section success-text">
            <h3>稀釋計算結果</h3>
            <div class="result-item">
                <span class="result-label">最終總用量</span>
                <span class="result-value">${finalVolume.toFixed(2)} ${document.getElementById('volume-unit').value}</span>
            </div>
            <div class="result-item">
                <span class="result-label">需要加入的溶劑</span>
                <span class="result-value">${solventNeeded.toFixed(2)} ${document.getElementById('volume-unit').value}</span>
            </div>
        </div>
        <div class="result-item info-text">
            <span>稀釋公式：C₁V₁ = C₂V₂</span>
        </div>
    `;
    
    resultDiv.innerHTML = html;
    resultDiv.classList.add('show');
}

// 顯示錯誤訊息
function showError(element, message) {
    element.innerHTML = `<div class="error" style="padding: 15px;">❌ ${message}</div>`;
    element.classList.add('show');
}

// 輸入驗證
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('change', function() {
        if (this.value < 0) {
            this.value = '';
        }
    });
});