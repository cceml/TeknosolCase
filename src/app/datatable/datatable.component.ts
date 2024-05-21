import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from '../../assets/service/data-service';
import { Il, Ilce } from './../../assets/model/model';

interface Record {
  ilName: string;
  il_id: number;
  ilceName: string;
  }

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.scss'],
  })
export class DatatableComponent implements OnInit {
  il!: Il[];
  ilce: Ilce[] = [];
  clonedProducts: { [s: string]: Record } = {};
  recordsTable: Record[] = [
    { "ilName": "İSTANBUL", "il_id": 34, "ilceName": "KARTAL" }
  ];
  recordsJson: any[] = [];
  visible: boolean = false;
  visible1: boolean = false;

  constructor(private dataService: DataService,
    private messageService: MessageService,
    private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.getIl();
    this.getIlce();
    this.visible1 = true;
  }

  getIl(): void {
    this.dataService.getIl().subscribe((data: Il[]) => {
      this.il = data;
    });
  }

  getIlce(): void {
    this.dataService.getIlce().subscribe((data: Ilce[]) => {
      this.ilce = data;
    });
  }

  onRowEditInit(record: Record) {
    this.clonedProducts[record.il_id] = { ...record };
  }

  onRowEditSave(record: Record, index: number) {
    // il_id değerinin 1-81 arasında olup olmadığını veya 503 olup olmadığını kontrol et
    if (record.il_id === null || (record.il_id < 1 || (record.il_id > 81 && record.il_id !== 503))) {
      record.ilName = '';
      record.ilceName = '' ;
        this.messageService.add({
            severity: 'warn',
            summary: 'Uyarı',
            detail: '1 ile 81 Arasında veya 503 Değerini Giriniz!'
        });

        // il_id 81'den büyükse selectedIl metodunu çağır
        if (record.il_id !== null && record.il_id > 81) {
            this.selectedIl(event, record);
        }

        // il_id'yi clonedProducts ile güncelle
        record.il_id = this.clonedProducts[record.ilName.toUpperCase()]?.il_id ?? record.il_id;
        this.cdr.detectChanges(); // Değişiklikleri manuel olarak algılat
    } else {
        // il_id geçerli ise ilName'i güncelle
        record.ilName = this.il.find(il => il.id === record.il_id)?.ilName.toUpperCase() || record.ilName.toUpperCase();

        // il_id geçerli ise ilceName'i güncelle
        const newList = this.ilce.filter(ilce => ilce.il_id === record.il_id);
        const searchIlce = newList.find(item => item.ilceName === record.ilceName.toUpperCase());

        if (searchIlce) {
            console.log(searchIlce);
            this.messageService.add({
                severity: 'success',
                summary: 'Başarılı',
                detail: 'Kayıt başarıyla güncellendi'
            });
        } else {
            this.messageService.add({
                severity: 'warn',
                summary: 'Başarısız',
                detail: 'Lütfen Seçilen İlin İlçelerinden Birini Giriniz'
            });
            record.ilceName = '';
        }

        console.log(newList);
        this.cdr.detectChanges(); // Değişiklikleri manuel olarak algılat
    }
  }

  onRowEditCancel(record: Record, index: number) {
    this.recordsTable[index] = this.clonedProducts[record.il_id];
    delete this.clonedProducts[record.il_id];
  }

  selectedIl(event: any, record: Record) {
    record.ilName = event.value.ilName;
    record.il_id = event.value.id;
    record.ilceName = '';
    this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: 'İlçe Alanını Doldurunuz' });
    console.log(event)
    this.cdr.detectChanges();
  }

  showLog() {
    const hasEmptyIlceName = this.recordsTable.some(record => !record.ilceName);
    if (hasEmptyIlceName) {
      this.messageService.add({ severity: 'error', summary: 'Hata', detail: 'İlçe adı boş olan kayıtlar var!' });
    } else {
      this.messageService.add({ severity: 'info', summary: 'Bilgi', detail: 'Tüm kayıtlar başarıyla gönderildi' });
      this.recordsJson = [...this.recordsTable];
      console.log(this.recordsJson);
      this.visible = true;
    }
  }

  toUpperCase(records : Record,event: Event): void {
    const input = event.target as HTMLInputElement;
    records.ilceName = input.value.toLocaleUpperCase('tr-TR');
    this.cdr.detectChanges();
  }

}
