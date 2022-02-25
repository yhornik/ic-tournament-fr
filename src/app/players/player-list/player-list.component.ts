import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngxs/store';
import { concatMap } from 'rxjs';
import { Player } from '../../interfaces/player.interface';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.scss'],
})
export class PlayerListComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  dataSource!: MatTableDataSource<Player>;
  selection = new SelectionModel<Player>(true, []);

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['select', 'Sexe', 'Licence', 'Nom', 'Prenom', 'SigleClub', 'SimpleCPPH', 'DoubleCPPH', 'MixteCPPH'];

  constructor(
    private service: PlayerService,
    private store: Store
  ) {}

  ngOnInit(): void {
    this.service.getPlayers()
      .subscribe(arr => {
        this.dataSource = new MatTableDataSource([...arr]);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        const arrChecked = arr.filter(item => item.IsChecked === true);
        this.selection.select(...arrChecked);
      })
  }

  ngAfterViewInit(): void {
    console.log('');
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  onCheckChanged(ev: MatCheckboxChange, row: Player): void {
    if (ev) {
      this.selection.toggle(row);
      row.IsChecked = ev.checked;
      this.service.updatePlayer(row)
        .pipe(concatMap(() => this.service.getPlayerById(row.id)))
        .subscribe(res => console.log(res));
    }
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected(): boolean {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource?.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle(): void {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row: Player | null): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection?.isSelected(row) ? 'deselect' : 'select'} row ${row.Licence}`;
  }

}
