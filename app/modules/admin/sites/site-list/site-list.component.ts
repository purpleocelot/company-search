import {
  Component,
  OnInit,
  EventEmitter,
  ViewChild,
  Output,
  Input
} from "@angular/core";
import { Site, NewSite } from "src/app/core/models/sites.model";
import {
  MatSort,
  MatPaginator,
  MatTable,
  MatTableDataSource
} from "@angular/material";
import { ActivatedRoute } from "@angular/router";
import { LoaderService } from "src/app/core/services/loader/loader.service";
import {
  sorting,
  predicateBy
} from "src/app/shared/functions/sorting.function";

@Component({
  selector: "loxam-site-list",
  templateUrl: "./site-list.component.html",
  styleUrls: ["./site-list.component.scss"]
})
export class SiteListComponent implements OnInit {
  @Input() sites: Array<Site>;
  @Input() selectedSite: Site;

  @Output() editingSite: EventEmitter<Site> = new EventEmitter<Site>();

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;

  public dataSource: MatTableDataSource<Site>;
  public columnsToDisplay = ["siteName", "isActive", "control"];

  constructor(
    private route: ActivatedRoute,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.route.data.subscribe(resolved => {
      this.sites = resolved.sites;
      this.loaderService.stopLoading("get-sites");
    });
    this.instantiateDataTable();
  }

  ngOnChanges() {
    if (!this.dataSource) return;
    this.dataSource.data = this.sites.sort(predicateBy("siteName"));
    this.registerMaterialSortAndPagination();
  }

  ngAfterViewInit() {
    this.registerMaterialSortAndPagination();
  }

  public editSite(site: Site) {
    this.selectedSite = site;
    this.editingSite.emit(site);
  }

  public applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  public addSite() {
    this.editSite(new NewSite());
  }

  private registerMaterialSortAndPagination(): void {
    this.dataSource.sortingDataAccessor = sorting;
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private instantiateDataTable() {
    this.dataSource = new MatTableDataSource<Site>(this.sites);
  }
}
