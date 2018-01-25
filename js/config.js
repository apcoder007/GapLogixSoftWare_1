materialAdmin
    .config(function ($stateProvider, $urlRouterProvider, $compileProvider, $mdThemingProvider){
        $urlRouterProvider.otherwise("/");

        $compileProvider.debugInfoEnabled(false);
    
    $mdThemingProvider.theme('default')
      .primaryPalette('blue')
      .accentPalette('pink');


        $stateProvider

            // -----------------------------
            // REPORT GENERATE
            // -----------------------------

            .state ('report', {
                url: '/report',
                templateUrl: 'views/report.html',
                controller:'reportCtrl'
            })
            .state ('report.index', {
                url: '/index',
                templateUrl: 'views/report_index.html'
            })
            .state ('report.payroll', {
                url: '/payroll',
                templateUrl: 'views/report_payroll.html',
                controller:'payreportCtrl'
            })
            .state ('report.salary', {
                url: '/salary',
                templateUrl: 'views/report_salary.html',
                controller:'salaryreportCtrl'
            })
        
            //------------------------------
            // HOME
            //------------------------------
            .state('login', {
                url:'/',
                templateUrl:'views/login.html',
                controller:'loginController'
                
            })

            .state('resetpassword', {
                url:'/reset/password',
                templateUrl:'views/resetpassword.html',
                controller:'resetPasswordController'
                
            })
            
            
            .state ('home', {
                url: '/home',
                templateUrl: 'views/home1.html',
                controller:'homeCtrl'
                
            })
            .state ('task', {
                url: '/task/:id',
                templateUrl: 'views/task.html',
                controller:'homeCtrl'
                
            })

            .state ('leave', {
                url: '/leave',
                templateUrl: 'views/leave.html',
                controller:'leaveCtrl'
            })

            .state ('directory', {
                url: '/directory',
                templateUrl: 'views/directory.html',
                controller:'directoryCtrl',
                resolve:{
                    empDetailsList: function(Data){
                    return Data.getEmpWithImageList();
                    }
                }
            })

            .state ('travelexpense', {
                url: '/travelexpense',
                templateUrl: 'views/travelexpense.html',
                controller:'travelexpenseCtrl',
                resolve:{
                    tripList: function(Data){
                    return Data.getTravelExpense();
                    }
                }
            })

            .state ('travelexpense.list', {
                url: '/list',
                templateUrl: 'views/travelexpnselist.html',
                controller:'travelexpenselistCtrl',
                resolve:{
                    tripList: function(Data){
                    return Data.getTravelExpense();
                    }
                }
            })

            .state ('travelexpense.details', {
                url: '/details',
                templateUrl: 'views/travelexpnsedetails.html',
                controller:'travelexpensedetailsCtrl',
                resolve:{
                    tripList: function(Data){
                    return Data.getTravelExpense();
                    }
                }
            })


            //------------------------------
            // HEADERS
            //------------------------------
            .state ('headers', {
                url: '/headers',
                templateUrl: 'views/common-2.html'
            })

            .state('headers.textual-menu', {
                url: '/textual-menu',
                templateUrl: 'views/textual-menu.html'
            })

            .state('headers.image-logo', {
                url: '/image-logo',
                templateUrl: 'views/image-logo.html'
            })

            .state('headers.mainmenu-on-top', {
                url: '/mainmenu-on-top',
                templateUrl: 'views/mainmenu-on-top.html'
            })


            //------------------------------
            // TYPOGRAPHY
            //------------------------------
        
            // .state ('typography', {
            //     url: '/typography',
            //     templateUrl: 'views/typography.html'
            // })


            //------------------------------
            // WIDGETS
            //------------------------------


        
            //------------------------------
            // FORMS
            //------------------------------
            .state ('form', {
                url: '/form',
                templateUrl: 'views/common.html'
            })

            .state ('form.basic-form-elements', {
                url: '/basic-form-elements',
                templateUrl: 'views/form-elements.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('form.form-components', {
                url: '/form-components',
                templateUrl: 'views/form-components.html'
            })
        
            .state ('form.form-examples', {
                url: '/form-examples',
                templateUrl: 'views/form-examples.html'
            })
        
            .state ('form.form-validations', {
                url: '/form-validations',
                templateUrl: 'views/form-validations.html'
            })
        
            
            //------------------------------
            // USER INTERFACE
            //------------------------------
        
            .state ('user-interface', {
                url: '/user-interface',
                templateUrl: 'views/common3.html',
                controller:'payCtrl',
                resolve:{
                    payDetails: function(Data){
                    return Data.getPayDeatils();
                    }
                }
            })
        
            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: 'views/ui-bootstrap.html'
            })

            .state ('user-interface.payslip', {
                url: '/payslip',
                templateUrl: 'views/payslip.html',
                controller: 'payrollController'
            })

            .state ('user-interface.salary', {
                url: '/salary',
                templateUrl: 'views/salary.html',
                controller: 'salaryController',
                resolve:{
                    empDetailsList: function(Data){
                    return Data.getEmpWithImageList();
                    }
                }
            })

            .state ('user-interface.fbpplanner', {
                url: '/fbpplanner',
                templateUrl: 'views/fbpplanner.html',
                controller:'fbpCtrl',
                resolve:{
                    fbpDetails:function(Data){
                        return Data.getFbpDetails();
                    }
                }
            })
        
            .state ('user-interface.investment', {
                url: '/investment',
                templateUrl: 'views/investment.html',
                controller:'investCtrl',
                resolve:{
                    taxdata:function(Data){
                        return Data.getTaxData();
                    }
                }
            })
        
            .state ('user-interface.ctcclaim', {
                url: '/ctcclaim',
                templateUrl: 'views/ctcclaim.html',
                controller:'ctcclaimCtrl',
                resolve:{
                    claimData:function(Data){
                        return Data.ctcclaimData();
                    }
                }
            })
        
            .state ('user-interface.myclaims', {
                url: '/myclaims',
                templateUrl: 'views/myclaims.html'
            })
        
            .state ('user-interface.simulator', {
                url: '/simulator',
                templateUrl: 'views/simulator.html'
            })

            .state ('user-interface.submission', {
                url: '/submission',
                templateUrl: 'views/submission.html'
            })

            .state ('user-interface.form16', {
                url: '/form16',
                templateUrl: 'views/form16.html'
            })
        
            .state ('user-interface.voluntry', {
                url: '/voluntry',
                templateUrl: 'views/voluntry.html'
                
            })
        
            .state ('user-interface.slip', {
                url: '/slip',
                templateUrl: 'views/slip.html'
            })
            .state ('user-interface.hire', {
                url: '/hire',
                templateUrl: 'views/hire.html'
            })
            .state ('user-interface.my12bb', {
                url: '/my12bb',
                templateUrl: 'views/my12bb.html'
            })
            .state ('user-interface.viewpayslip', {
                url: '/viewpayslip',
                templateUrl: 'views/viewpayslip.html'
            })
            .state ('user-interface.16admin', {
                url: '/16admin',
                templateUrl: 'views/16admin.html'
            })
            .state ('user-interface.carlease', {
                url: '/carlease',
                templateUrl: 'views/carlease.html'
            })
            .state ('user-interface.payrollreport', {
                url: '/payrollreport',
                templateUrl: 'views/payrollreport.html'
            })
            .state ('user-interface.reports', {
                url: '/reports',
                templateUrl: 'views/reports.html'
            })
            
        
            //------------------------------
            // CHARTS
            //------------------------------
            
            .state ('charts', {
                url: '/charts',
                templateUrl: 'views/common1.html'
            })

            .state ('charts.flot-charts', {
                url: '/flot-charts',
                templateUrl: 'views/flot-charts.html',
                controller:'leaveController'
            })
            .state ('charts.holiday-charts', {
                url: '/holiday-charts',
                templateUrl: 'views/holiday-charts.html',
            })

            .state ('charts.other-charts', {
                url: '/other-charts',
                templateUrl: 'views/other-charts.html',
                
            })
        
        
            //------------------------------
            // CALENDAR
            //------------------------------
            
            .state ('calendar', {
                url: '/calendar',
                templateUrl: 'views/calendar.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.css',
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/moment/min/moment.min.js',
                                    'vendors/bower_components/fullcalendar/dist/fullcalendar.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
        
            //------------------------------
            // PHOTO GALLERY
            //------------------------------
            
             .state ('photo-gallery', {
                url: '/punch',
                templateUrl: 'views/common.html',
                controller:'punchController'
            })

            //Default
        
            .state ('photo-gallery.attendance', {
                url: '/attendance',
                templateUrl: 'views/attendance.html',
                controller:'attendanceController'
            })
            .state ('photo-gallery.regularization', {
                url: '/regularization',
                templateUrl: 'views/regularization.html',
                controller:'regularizeCtrl'
            })
            .state ('photo-gallery.myshift', {
                url: '/myshift',
                templateUrl: 'views/myshift.html'
            })
            .state ('photo-gallery.myattendance', {
                url: '/myattendance',
                templateUrl: 'views/myattendance.html',
                controller: 'myattendanceCtrl'
            })
            .state ('photo-gallery.myregularization', {
                url: '/myregularization',
                templateUrl: 'views/myregularization.html',
                controller: 'myregularizationCtrl'
            })
            .state ('photo-gallery.shiftrequest', {
                url: '/shiftrequest',
                templateUrl: 'views/shiftrequest.html'
            })
            .state ('photo-gallery.task', {
                url: '/task',
                templateUrl: 'views/task.html'
            })
            .state ('photo-gallery.proxy', {
                url: '/proxy',
                templateUrl: 'views/proxy.html'
            })
            .state ('photo-gallery.bulk', {
                url: '/bulk',
                templateUrl: 'views/bulk.html'
            })
            .state ('photo-gallery.attendancedetails', {
                url: '/attendancedetails',
                templateUrl: 'views/attendancedetails.html'
            })
            .state ('photo-gallery.attendanceReport', {
                url: '/attendanceReport',
                templateUrl: 'views/attendanceReport.html'
            })
        
            //Timeline
    
            .state ('photo-gallery.timeline', {
                url: '/timeline',
                templateUrl: 'views/photo-timeline.html'
            })
        
        
            //------------------------------
            // GENERIC CLASSES
            //------------------------------
            
            .state ('generic-classes', {
                url: '/generic-classes',
                templateUrl: 'views/generic-classes.html'
            })
        
            
            //------------------------------
            // PAGES
            //------------------------------
            
            .state ('pages', {
                url: '/pages',
                templateUrl: 'views/common-2.html',
                controller:'pagesCtrl'
            })
            
        
            //Profile

            .state ('pages.typography', {
                url: '/typography',
                templateUrl: 'views/typography.html'
            })
        
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html',
                controller:'profileCtrl'
            })

        
            .state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: 'views/profile-about.html',
                controller:'profileaboutCtrl'
            })
        
            .state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/profile-timeline.html',
                controller:'profileTimelineCtrl',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('pages.profile.profile-photos', {
                url: '/profile-photos',
                templateUrl: 'views/profile-photos.html',
                controller:'profilephotoCtrl',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('pages.profile.profile-connections', {
                url: '/profile-connections',
                templateUrl: 'views/profile-connections.html',
                controller:'loginProfileConnectionCtrl'
            })
            .state ('prof', {
                url: '/prof',
                templateUrl: 'views/common-2.html'
            })
            
        
            //Profile
        
            .state ('prof.employee', {
                url: '/employee',
                templateUrl: 'views/employee.html',
                controller:'employeeCtrl'
            })
        
            .state ('prof.employee.employee-about', {
                url: '/employee-about',
                templateUrl: 'views/employee-about.html',
                controller:'pastEmpCtrl'
            })

            .state ('prof.employee.employee-education', {
                url: '/employee-education',
                templateUrl: 'views/employee-education.html',
                controller: 'employeeEduCtrl',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            .state ('prof.employee.employee-bank', {
                url: '/bank-info',
                templateUrl: 'views/employee-bank.html',
                controller:'bankCtrl',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'css',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })
        
            .state ('prof.employee.employee-id', {
                url: '/employee-id',
                templateUrl: 'views/employee-id.html',
                controller:'idDetailsCtrl'
            })

            //emplist

            .state ('prof.employeelist', {
                url: '/employee-list',
                templateUrl: 'views/employee-list.html'
            })

            .state ('prof.employeelist.menu', {
                url: '/employee-list-menu',
                templateUrl: 'views/employee-list-menu2.html',
                controller: 'employeelistCtrl',
                resolve:{
                    empList: function(Data){
                    return Data.empList();
                    }
                }
            })

            .state ('prof.employeelist.edit', {
                url: '/employee-list-edit/:id',
                templateUrl: 'views/employees/profile.html',
                controller: 'employeeEditCtrl'
            })

            .state ('prof.employeelist.edit.basic', {
                url: '/basic',
                templateUrl: 'views/employees/profile-about.html',
                controller: 'employeeBasicEditCtrl'
            })

            .state ('prof.employeelist.edit.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/employees/profile-timeline.html',
                controller: 'employeeProfileEditCtrl'
            })

            .state ('prof.employeelist.edit.profile-contact', {
                url: '/profile-contact',
                templateUrl: 'views/employees/profile-photos.html',
                controller: 'employeeContactEditCtrl'
            })

            .state ('prof.employeelist.edit.profile-connections', {
                url: '/profile-connections',
                templateUrl: 'views/employees/profile-connections.html',
                controller: 'employeeConnectionEditCtrl'
            })

             //add emp

            .state ('prof.employeelist.addemployee', {
                url: '/addemployee',
                templateUrl: 'views/addEmployee.html',
                controller:'addEmpMainCtrl'
            })

            .state ('prof.employeelist.addemployee.basic', {
                url: '/basicdetails',
                templateUrl: 'views/basicemp.html',
                controller: 'addEmployeeController',
                resolve:{
                    l1managerList: function(Data){
                        return Data.l1Manager();
                    },

                    l2managerList: function(Data){
                        return Data.l2Manager();
                    },

                    hrmanagerList: function(Data){
                        return Data.hrManager();
                    },

                    designationList: function(Data){
                        return Data.Designation();
                    }
                }
            })

            .state ('prof.employeelist.addemployee.contact', {
                url: '/contactdetails',
                templateUrl: 'views/contactemp.html',
                controller: 'contactEmployeeController'
            })

            .state ('prof.employeelist.addemployee.family', {
                url: '/familydetails',
                templateUrl: 'views/familyemp.html',
                controller: 'familyEmployeeController'
            })

            .state ('prof.employeelist.addemployee.pastemp', {
                url: '/pastempdetails',
                templateUrl: 'views/pastemp.html',
                controller: 'addPastEmployeeController'
            })

            .state ('prof.employeelist.addemployee.educationemp', {
                url: '/educationdetails',
                templateUrl: 'views/educationemp.html',
                controller: 'employeeEducationController'
            })

            .state ('prof.employeelist.addemployee.bankemp', {
                url: '/bankdetails',
                templateUrl: 'views/bankemp.html',
                controller: 'employeeBankController'
            })

            .state ('prof.employeelist.addemployee.idemp', {
                url: '/iddetails',
                templateUrl: 'views/idemp.html',
                controller: 'employeeIdController'
            })

            .state ('prof.employeelist.addemployee.salaryemp', {
                url: '/salarydetails',
                templateUrl: 'views/salaryemp.html',
                controller: 'employeeSalaryController'
            })


        
            






        
        
            //-------------------------------
        
            .state ('pages.listview', {
                url: '/listview',
                templateUrl: 'views/list-view.html'
            })
        
            .state ('pages.messages', {
                url: '/messages',
                templateUrl: 'views/messages.html'
            })
        
            .state ('pages.pricing-table', {
                url: '/pricing-table',
                templateUrl: 'views/pricing-table.html'
            })
        
            .state ('pages.contacts', {
                url: '/contacts',
                templateUrl: 'views/contacts.html'
            })
        
            .state ('pages.invoice', {
                url: '/invoice',
                templateUrl: 'views/invoice.html'
            })
                                
            .state ('pages.wall', {
                url: '/wall',
                templateUrl: 'views/wall.html',
                resolve: {
                    loadPlugin: function($ocLazyLoad) {
                        return $ocLazyLoad.load ([
                            {
                                name: 'vendors',
                                insertBefore: '#app-level',
                                files: [
                                    'vendors/bower_components/autosize/dist/autosize.min.js',
                                    'vendors/bower_components/lightgallery/light-gallery/css/lightGallery.css'
                                ]
                            },
                            {
                                name: 'vendors',
                                files: [
                                    'vendors/bower_components/mediaelement/build/mediaelement-and-player.js',
                                    'vendors/bower_components/lightgallery/light-gallery/js/lightGallery.min.js'
                                ]
                            }
                        ])
                    }
                }
            })

            
            
            //------------------------------
            // BREADCRUMB DEMO
            //------------------------------
            .state ('breadcrumb-demo', {
                url: '/breadcrumb-demo',
                templateUrl: 'views/breadcrumb-demo.html'
            })

            //----------------------------------
            //   ADMIN CONFIGURE
            //----------------------------------
    });



