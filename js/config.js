materialAdmin
    .config(function ($stateProvider, $urlRouterProvider){
        $urlRouterProvider.otherwise("/");


        $stateProvider
        
            //------------------------------
            // HOME
            //------------------------------
            .state('login', {
                url:'/',
                templateUrl:'views/login.html'
                
            
            })
            
            .state ('home', {
                url: '/home',
                templateUrl: 'views/home1.html'
                
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
        
            .state ('typography', {
                url: '/typography',
                templateUrl: 'views/typography.html'
            })


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
                templateUrl: 'views/common3.html'
            })
        
            .state ('user-interface.ui-bootstrap', {
                url: '/ui-bootstrap',
                templateUrl: 'views/ui-bootstrap.html'
            })

            .state ('user-interface.payslip', {
                url: '/payslip',
                templateUrl: 'views/payslip.html'
            })

            .state ('user-interface.fbpplanner', {
                url: '/fbpplanner',
                templateUrl: 'views/fbpplanner.html'
            })
        
            .state ('user-interface.investment', {
                url: '/investment',
                templateUrl: 'views/investment.html'
            })
        
            .state ('user-interface.ctcclaim', {
                url: '/ctcclaim',
                templateUrl: 'views/ctcclaim.html'
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
                url: '/photo-gallery',
                templateUrl: 'views/common.html'
            })

            //Default
        
            .state ('photo-gallery.attendance', {
                url: '/attendance',
                templateUrl: 'views/attendance.html'
            })
            .state ('photo-gallery.regularization', {
                url: '/regularization',
                templateUrl: 'views/regularization.html'
            })
            .state ('photo-gallery.myshift', {
                url: '/myshift',
                templateUrl: 'views/myshift.html'
            })
            .state ('photo-gallery.myattendance', {
                url: '/myattendance',
                templateUrl: 'views/myattendance.html'
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
                templateUrl: 'views/common-2.html'
            })
            
        
            //Profile
        
            .state ('pages.profile', {
                url: '/profile',
                templateUrl: 'views/profile.html'
            })
        
            .state ('pages.profile.profile-about', {
                url: '/profile-about',
                templateUrl: 'views/profile-about.html'
            })
        
            .state ('pages.profile.profile-timeline', {
                url: '/profile-timeline',
                templateUrl: 'views/profile-timeline.html',
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
                templateUrl: 'views/profile-connections.html'
            })
            .state ('prof', {
                url: '/prof',
                templateUrl: 'views/common-2.html'
            })
            
        
            //Profile
        
            .state ('prof.employee', {
                url: '/employee',
                templateUrl: 'views/employee.html'
            })
        
            .state ('prof.employee.employee-about', {
                url: '/employee-about',
                templateUrl: 'views/employee-about.html'
            })
        
            .state ('prof.employee.employee-education', {
                url: '/employee-education',
                templateUrl: 'views/employee-education.html',
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
                url: '/profile-photos',
                templateUrl: 'views/employee-bank.html',
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
                templateUrl: 'views/employee-id.html'
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



